// src/pages/AttractionDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid as Grid2, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import BookingForm from '../components/BookingForm';

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

// Mock data - replace with actual API calls in a real application
const getAttractionById = (id) => ({
  id: id,
  name: 'Eiffel Tower',
  description: 'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.',
  image: 'https://example.com/eiffel.jpg',
  price: 25,
  location: 'Paris, France',
  rating: 4.5,
});

function AttractionDetailPage() {
  const { id } = useParams();
  const attraction = getAttractionById(id);

  return (
    <StyledContainer maxWidth={false}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ my: 4 }}>
        {attraction.name}
      </Typography>
      <AnimatedGrid container spacing={3}>
        <Grid2 item xs={12} md={8}>
          <Paper elevation={3}>
            <Box component="img" src={attraction.image} alt={attraction.name} sx={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }} />
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Description</Typography>
              <Typography variant="body1">{attraction.description}</Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Location</Typography>
              <Typography variant="body1">{attraction.location}</Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Price</Typography>
              <Typography variant="body1">${attraction.price}</Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Rating</Typography>
              <Typography variant="body1">{attraction.rating} / 5</Typography>
            </Box>
          </Paper>
        </Grid2>
        <Grid2 item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <BookingForm attractionId={id} />
          </Paper>
        </Grid2>
      </AnimatedGrid>
    </StyledContainer>
  );
}

export default AttractionDetailPage;
