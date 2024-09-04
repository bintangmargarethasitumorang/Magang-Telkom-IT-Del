import express from "express";
import { getUsers, Register, Login, Logout, addUser, editUser, deleteUser } from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.put('/users', verifyToken, editUser); // Updated route
router.delete('/users/:id', verifyToken, deleteUser); // Updated route
router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/token', refreshToken);

export default router;
