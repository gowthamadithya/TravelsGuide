// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import axios from 'axios';
import { BASE_URL } from '../api/ApiService';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const AnimatedBox = styled(Box)(({ theme, delay }) => ({
  animation: `${fadeIn} 1s ease-out ${delay}s both`,
}));

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginPayload = {
      username,
      password,
    }

    await axios.post(`${BASE_URL}api/login/`, loginPayload)
    .then((loginResponse) => console.log(loginResponse.data))
    .catch((error) => console.log(error.response ? error.response.data : error.message));
  };

  return (
    <StyledContainer maxWidth="sm">
      <AnimatedBox delay={0}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ my: 4 }}>
          Log In
        </Typography>
      </AnimatedBox>
      <AnimatedBox delay={0.2}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleLogin}>
          <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Log In
            </Button>
          </form>
        </Paper>
      </AnimatedBox>
    </StyledContainer>
  );
}

export default LoginPage;
