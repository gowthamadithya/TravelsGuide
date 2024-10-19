// src/components/RatingModal.js
import React from 'react';
import { Box, Typography, IconButton, Modal, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const RatingModal = ({ open, onClose, rating, onRate }) => {
  const handleRatingClick = (value) => {
    onRate(value);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        bgcolor: 'background.paper', 
        boxShadow: 24, 
        p: 4, 
        borderRadius: 2 
      }}>
        <Typography variant="h6" gutterBottom>
          Rate this:
        </Typography>
        <Grid container spacing={1} sx={{ justifyContent: 'center', mt: 1 }}>
          {[...Array(10)].map((_, index) => {
            const value = index + 1;
            return (
              <Grid item key={value}>
                <IconButton onClick={() => handleRatingClick(value)}>
                  {value <= rating ? <StarIcon color="primary" /> : <StarBorderIcon />}
                </IconButton>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Modal>
  );
};

export default RatingModal;
