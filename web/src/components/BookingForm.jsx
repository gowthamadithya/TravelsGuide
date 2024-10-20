// src/components/BookingForm.js
import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { BASE_URL, api, userName } from '../api/ApiService';
import { StoreContext } from '../Store/Store';

function BookingForm({ attractionID}) {
  const [bookingData, setBookingData] = useState({
    date: '',
    numberOfPeople: '',
  });
  const {state, dispatch} = useContext(StoreContext)
  const {username } = state.user
  console.log(attractionID)

  const handleChange = (event) => {
    setBookingData({ ...bookingData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      ...state.user, visited_places: [...(state.user.visited_places || []), attractionID]
    }
    console.log(updatedUser)
    api.put(`${BASE_URL}api/users/${username}/`, updatedUser, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    })
  .then((response) => dispatch({ type: 'SET_USER', payload: response.data }))
  .catch((err) => console.log(err.message));
  }

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