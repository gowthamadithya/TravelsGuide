// src/pages/AttractionDetailPage.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid as Grid2, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import BookingForm from '../components/BookingForm';
import { BASE_URL, api } from '../api/ApiService';
import RatingBox from '../components/RatingBox';
import { StoreContext } from '../Store/Store';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  padding: theme.spacing(4),
}));

const AnimatedGrid = styled(Grid2)(({ theme }) => ({
  animation: 'fadeIn 1s ease-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}));


function AttractionDetailPage() {
  const { placeId } = useParams();
  const [attraction, setAttraction] = useState({})
  const [userRating, setUserRating] = useState(null)
  const {state, dispatch } = useContext(StoreContext)
  const {id, username} = state.user

  const handleRate = async (value) => {
    setUserRating(value)
    const rating = {
      'user': id,
      'place': placeId,
      'rating': value
    }
    api.post(`${BASE_URL}crpred/ratings/`, rating)
    .then((response)=> console.log(response))
    .catch((err)=> console.log(err.message))
  }

  const getAttractionById = async (id) => {
    try {
      const response = await api.get(`${BASE_URL}api/places/${id}/`, {
        headers: {
          Authorization: `Bearer ${state.auth.access}`,
        },
      });
      setAttraction(response.data);
      // Check if the attraction is already in history
      const isAlreadyInHistory = state.history.some(item => item.id === response.data.id);
      if (!isAlreadyInHistory) {
        dispatch({ type: 'ADD_TO_HISTORY', payload: response.data });
    }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=> {
    getAttractionById(placeId);
  },[placeId])

  // console.log(attraction)
  console.log(state.history)

  return (
    <StyledContainer maxWidth={false}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ my: 4 }}>
        {attraction.name}
      </Typography>
      <AnimatedGrid container spacing={3}>
        <Grid2 item xs={12} md={8}>
          <Paper elevation={3}>
            <Box component="img" src={attraction.image_url} alt={attraction.name} sx={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }} />
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Description</Typography>
              <Typography variant="body1">{attraction.description}</Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Location</Typography>
              <Typography variant="body1">{attraction.location}</Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Price</Typography>
              <Typography variant="body1">${attraction.average_price}</Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Rating</Typography>
              <Typography variant="body1">{attraction.average_rating}</Typography>
              <RatingBox userRating={userRating} onRate={(value) => handleRate(value)} />
            </Box>
          </Paper>
        </Grid2>
        <Grid2 item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <BookingForm attractionID = {attraction.id} />
          </Paper>
        </Grid2>
      </AnimatedGrid>
    </StyledContainer>
  );
}

export default AttractionDetailPage;
