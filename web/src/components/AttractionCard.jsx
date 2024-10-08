// src/components/AttractionCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  width: 280,
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  objectFit: 'cover',
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

function AttractionCard({ attraction }) {
  return (
    <StyledCard>
      <StyledCardMedia
        component="img"
        image={attraction.image_url}
        alt={attraction.name}
      />
      <StyledCardContent>
        <Box>
          <Typography gutterBottom variant="h6" component="div">
            {attraction.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {attraction.description}
          </Typography>
        </Box>
        <Button 
          component={Link} 
          to={`/attraction/${attraction.id}`} 
          size="small" 
          color="primary"
          sx={{ 
            alignSelf: 'flex-start',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
        >
          View Details
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
}

export default AttractionCard;