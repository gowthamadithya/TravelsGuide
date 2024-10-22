// src/pages/LoginPage.js
import React, { useContext, useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Link as MuiLink } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {api, BASE_URL } from '../api/ApiService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { StoreContext } from '../Store/Store';

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
  const [errorMessage, setErrorMessage] = useState('');
  const {state, dispatch} = useContext(StoreContext)

  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginPayload = {
      username,
      password,
    };

    try {
      const loginResponse = await api.post(`${BASE_URL}api/login/`, loginPayload);
      console.log(loginResponse.data);
      console.log('Access Token:', loginResponse.data.access);
      console.log('Refresh Token:', loginResponse.data.refresh);
      // Store tokens in localStorage
      // localStorage.setItem('access_token', loginResponse.data.access);
      // localStorage.setItem('refresh_token', loginResponse.data.refresh);
      dispatch({type: 'ADD_AUTH', payload: loginResponse.data})
      // Optionally redirect to the homepage or dashboard upon successful login
      navigate('/'); // Redirect after successful login
      await api.get(`${BASE_URL}api/users/${username}/`)
      .then((response)=> dispatch({type: 'SET_USER', payload: response.data}))
      .catch((err)=> console.log(err.message))
    } catch (error) {
      if (error.response) {
        // Check for specific errors
        if (error.response.status === 401) {
          setErrorMessage('Invalid username or password.');
        } else {
          console.log(error.response.data);
        }
      } else {
        console.log(error.message);
      }
    }
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
            {errorMessage && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Log In
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <MuiLink href="/signup" variant="body2">
              Sign up
            </MuiLink>
          </Typography>
        </Paper>
      </AnimatedBox>
    </StyledContainer>
  );
}

export default LoginPage;
