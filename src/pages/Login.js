// Login.js

import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/Auth'; // Importe o serviço Auth.js
import { themes } from "../Helpers/Theme";
import Navbar from '../Components/NavBar';

const LoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginPaper = styled(Paper)`
  padding: 20px;
  width: 300px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "150px 0",
    backgroundColor: themes.palette.primary.maindark,
    height: "100vh",
    color: themes.palette.primary.white,
  },
  buttonStyles: {
    backgroundColor: themes.palette.primary.darkbtn,
    borderRadius: "3px",
    color: themes.palette.primary.white,
    padding: "10px 18px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    margin: "20px 0",
  },
  text: {
    width: "35%",
    margin: "15px auto",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
}));

const Login = ({ setIsLogged }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await AuthService.login(username, password);
      console.log('Login bem-sucedido:', data);
      localStorage.setItem('isLoggedin', true);
      setIsLogged(true);
      navigate('/');
      // Redirecione o usuário ou faça outras ações pós-login aqui
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || 'Ocorreu um erro ao fazer login.');
    }
  };

  return (<>
    <Navbar />
    <LoginContainer>
      <LoginPaper elevation={3}>
        <Typography variant="h5">Login</Typography>
        <TextField
          label="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </LoginPaper>
    </LoginContainer>
    </>
  );
};

export default Login;

