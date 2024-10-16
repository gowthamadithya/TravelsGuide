// src/pages/SignupPage.js
import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Link as MuiLink } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { BASE_URL, api } from '../api/ApiService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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

function SignupPage() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(0);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const navigate = useNavigate(); // Hook for navigation

  const handleSignup = async (e) => {
    e.preventDefault();
    const signupPayload = {
      username,
      'first_name': firstname,
      'last_name': lastname,
      email,
      password,
      'age': Number(age),
    };

    try {
      const signupResponse = await api.post(`${BASE_URL}api/signup/`, signupPayload);
      console.log(signupResponse.data);
      // Optionally, redirect to login or another page on successful signup
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      if (error.response) {
        // Check if the account already exists
        if (error.response.status === 409) { // Assuming 409 Conflict for existing accounts
          setErrorMessage('An account with this email already exists.');
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
          Sign Up
        </Typography>
      </AnimatedBox>
      <AnimatedBox delay={0.2}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <form onSubmit={handleSignup}>
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
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <TextField
              label="Age"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>
            {errorMessage && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <MuiLink href="/login" variant="body2">
              Log in
            </MuiLink>
          </Typography>
        </Paper>
      </AnimatedBox>
    </StyledContainer>
  );
}

export default SignupPage;
