// src/pages/LandingPage.js
import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import AttractionRow from '../components/AttractionRow';
import { BASE_URL, api } from '../api/ApiService';
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

const HeroSection = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '60vh',
}));

const AnimatedTypography = styled(Typography)(({ theme, delay }) => ({
  animation: `${fadeIn} 1s ease-out ${delay}s both`,
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  animation: `${fadeIn} 1s ease-out 0.6s both`,
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
}));


function LandingPage() {
  const [preds, setPreds] = useState([]);
  const [pops, setPops] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const { state, dispatch } = useContext(StoreContext)
  const { user, history, auth } = state


  const getUserPreds = async () => {
    try {
      const response = await api.get(`${BASE_URL}crpred/create/?user_id=${user.id}`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      });
      setPreds(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user predictions. unauthorised');
    }
  };

  const getPops = async () => {
    try {
      const response = await api.get(`${BASE_URL}api/places/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      });
      setPops(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user predictions. unauthorised');
    }
  };

  useEffect(() => {
    if (user.id) {
      getUserPreds();
    }
    getPops()
  }, [user.id]);

  return (
    <StyledContainer maxWidth={false}>
      <HeroSection>
        <AnimatedTypography variant="h2" component="h1" gutterBottom delay={0}>
          Welcome to travelers-IN
        </AnimatedTypography>
        <AnimatedTypography variant="h5" component="h2" gutterBottom delay={0.3}>
          Discover amazing tourist attractions around the world
        </AnimatedTypography>
        <AnimatedButton
          component={Link}
          to="/search"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Start Exploring
        </AnimatedButton>
      </HeroSection>
      <Box sx={{ mb: 4 }}>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <AttractionRow title="Recommended for You" attractions={preds} />
        <AttractionRow title="Popular Attractions" attractions={pops} />
        <AttractionRow title="continue on  your last search" attractions={history} />
        <Typography variant="h2" gutterBottom sx={{ my: 4 }}>
          <Link to={'/addplace'}> Places missed in the list Add it </Link>
        </Typography>
      </Box>
    </StyledContainer>
  );
}

export default LandingPage;
