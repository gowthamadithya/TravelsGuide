// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Avatar } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import AttractionCard from '../components/AttractionCard';
import AttractionRow from '../components/AttractionRow';
import { BASE_URL, readResource } from '../api/ApiService';
import axios from 'axios';

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


// Mock visited and liked attractions
const visitedAttractions = [
  { id: 1, name: 'Eiffel Tower', description: 'Iconic iron tower in Paris', image: 'https://example.com/eiffel.jpg' },
  { id: 2, name: 'Colosseum', description: 'Ancient amphitheater in Rome', image: 'https://example.com/colosseum.jpg' },
];

const likedAttractions = [
  { id: 3, name: 'Great Wall of China', description: 'Ancient fortification in northern China', image: 'https://example.com/greatwall.jpg' },
  { id: 4, name: 'Machu Picchu', description: 'Incan citadel in Peru', image: 'https://example.com/machupicchu.jpg' },
];

// const userend = `crpred/recommend/?username=${user.username}`
// const recommendations = readResource("todos/")
// console.log(recommendations)

function ProfilePage() {

  const [user, setUser] = useState({})
  // Mock user data
  const getUserData = ()=> {
    const userResponce = async ()=> await axios.get(`${BASE_URL}api/users/${username}/`)
    userResponce()
    .then((response)=> setUser(response.data))
    .catch((err)=> console.log(err))
  } 

  useEffect(()=>{
    getUserData()
  },[])

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
              // src={user.avatar || null}
              alt={user.username}
              sx={{ width: 120, height: 120, margin: 'auto', mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>{user.username}</Typography>
            <Typography variant="body1" color="text.secondary">{user.email}</Typography>
          </Paper>
        </AnimatedBox>
        </Box>
           <Box sx={{ mb: 4 }}>
           <AttractionRow title="Visited Attractions" attractions={visitedAttractions} />
           <AttractionRow title="Liked Attractions" attractions={likedAttractions} />
         </Box>
        </StyledContainer>


  );
}

export default ProfilePage;
