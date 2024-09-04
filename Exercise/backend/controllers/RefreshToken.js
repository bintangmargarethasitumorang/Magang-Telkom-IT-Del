import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";


export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log('Received refreshToken:', refreshToken); // Log token
         
        if (!refreshToken) return res.sendStatus(401);

        const users = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });

        if (users.length === 0) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log('JWT verify error:', err); // Log error
                return res.sendStatus(403);
            }

            const user = users[0];
            const userId = user.id;
            const name = user.name;
            const email = user.email;

            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });

            console.log('New accessToken:', accessToken); // Log new token
            res.json({ accessToken });
        });
    } catch (error) {
        console.error('Server error:', error); // Log server error
        res.sendStatus(500);
    }
};

