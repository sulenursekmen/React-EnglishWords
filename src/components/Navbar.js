import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './logo.svg';

const Navbar = () => {

  return (
    <AppBar position="static" >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1  }}>
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="logo"/>
          </Link>
        </Typography>
        <Button color="secondary">
          <Link to="/a1" style={{ textDecoration: 'none', color: 'white' }}>
            A1
          </Link>
        </Button>
        <Button color="secondary">
          <Link to="/a2" style={{ textDecoration: 'none', color: 'white' }}>
            A2
          </Link>
        </Button>
        <Button color="secondary">
          <Link to="/b1" style={{ textDecoration: 'none', color: 'white' }}>
            B1
          </Link>
        </Button>
        <Button color="secondary">
          <Link to="/b2" style={{ textDecoration: 'none', color: 'white' }}>
            B2
          </Link>
        </Button>
        <Button color="secondary">
          <Link to="/c1" style={{ textDecoration: 'none', color: 'white' }}>
            C1
          </Link>
        </Button>
        <Button color="secondary">
          <Link to="/c2" style={{ textDecoration: 'none', color: 'white' }}>
            C2
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
