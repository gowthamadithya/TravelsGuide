// src/pages/ProfilePage.js
import React from 'react';
import { Container, Typography, Box, Paper, Avatar } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import AttractionCard from '../components/AttractionCard';

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

// Mock user data
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://example.com/avatar.jpg',
};

// Mock visited and liked attractions
const visitedAttractions = [
  { id: 1, name: 'Eiffel Tower', description: 'Iconic iron tower in Paris', image: 'https://example.com/eiffel.jpg' },
  { id: 2, name: 'Colosseum', description: 'Ancient amphitheater in Rome', image: 'https://example.com/colosseum.jpg' },
];

const likedAttractions = [
  { id: 3, name: 'Great Wall of China', description: 'Ancient fortification in northern China', image: 'https://example.com/greatwall.jpg' },
  { id: 4, name: 'Machu Picchu', description: 'Incan citadel in Peru', image: 'https://example.com/machupicchu.jpg' },
];

function ProfilePage() {
  return (
    <StyledContainer maxWidth="lg">
      <AnimatedBox delay={0}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ my: 4 }}>
          User Profile
        </Typography>
      </AnimatedBox>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <AnimatedBox delay={0.2} sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 120, height: 120, margin: 'auto', mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>{user.name}</Typography>
            <Typography variant="body1" color="text.secondary">{user.email}</Typography>
          </Paper>
        </AnimatedBox>

        <AnimatedBox delay={0.4} sx={{ flex: 2 }}>
          <Typography variant="h5" gutterBottom>Visited Attractions</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {visitedAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </Box>

          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Liked Attractions</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {likedAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </Box>
        </AnimatedBox>
      </Box>
    </StyledContainer>
  );
}

export default ProfilePage;
