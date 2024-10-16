// src/components/BookingForm.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { api, userName } from '../api/ApiService';

function BookingForm({ attractionId }) {
  const [bookingData, setBookingData] = useState({
    date: '',
    numberOfPeople: '',
  });

  const handleChange = (event) => {
    setBookingData({ ...bookingData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api.put(`${BASE_URL}api/users/${userName}/`, )
    console.log('Booking submitted:', { attractionId, ...bookingData });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Book This Attraction
      </Typography>
      <TextField
        fullWidth
        label="Date"
        name="date"
        type="date"
        value={bookingData.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Number of People"
        name="numberOfPeople"
        type="number"
        value={bookingData.numberOfPeople}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Book Now
      </Button>
    </Box>
  );
}

export default BookingForm;