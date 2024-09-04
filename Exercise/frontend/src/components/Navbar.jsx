import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate dari react-router-dom
import { AppBar, Toolbar, IconButton, Typography, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout', { withCredentials: true }); // Pastikan `withCredentials` diatur untuk mengirim cookie
      navigate("/"); // Navigasi ke halaman beranda setelah logout
    } catch (error) {
      console.error('Logout failed:', error); // Log error jika logout gagal
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
 
        </Typography>
        <Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button color="inherit" onClick={Logout} startIcon={<LogoutIcon />}>
            Log Out
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
