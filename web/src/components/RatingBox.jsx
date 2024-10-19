// src/components/RatingBox.js
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import RatingModal from './RatingModal';

const RatingBox = ({ userRating, onRate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <Box sx={{ mt: 2 }}>
    <Typography variant="h6">
          Your Rating: 
    </Typography>
      {userRating ? (
        <Typography variant="body1">
           {userRating} {userRating === 1 ? 'star' : 'stars'}
        </Typography>
      ) : (
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Rate
        </Button>
      )}
      <RatingModal 
        open={modalOpen} 
        onClose={handleClose} 
        rating={userRating || 0} 
        onRate={onRate} 
      />
    </Box>
  );
};

export default RatingBox;
