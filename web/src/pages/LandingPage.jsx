// src/pages/LandingPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import AttractionRow from '../components/AttractionRow';
import { BASE_URL, api } from '../api/ApiService';

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


const recentlyViewed = [
  { id: 3, name: 'Great Wall of China', description: 'Ancient fortification in northern China', image: 'https://example.com/greatwall.jpg' },
  { id: 4, name: 'Machu Picchu', description: 'Incan citadel in Peru', image: 'https://example.com/machupicchu.jpg' },
  // Add more attractions...
];

function LandingPage() {
  const [preds, setPreds] = useState([]);
  const [pops, setPops] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  const getUserPreds = async () => {
    try {
      const response = await api.get(`${BASE_URL}api/places/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setPreds(response.data);
      setPops(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user predictions. unauthorised'); // Set an error message
    }
  };

  useEffect(() => {
    getUserPreds();
  }, []);

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
        <AttractionRow title="continue on  your last search" attractions={recentlyViewed} />
      </Box>
    </StyledContainer>
  );
}

export default LandingPage;
