import React, { useContext, useState } from 'react';
import { Container, Typography, Grid as Grid2, Paper, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StoreContext } from '../Store/Store';
import { BASE_URL, api } from '../api/ApiService';

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

function AddPlacePage() {
  const { dispatch } = useContext(StoreContext);
  const [placeDetails, setPlaceDetails] = useState({
    name: '',
    tagline: '',
    description: '',
    image_url: '',
    location: '',
    average_price: '',
    opening_hours: '',
    website_url: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaceDetails({ ...placeDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`${BASE_URL}api/places/`, placeDetails);
      dispatch({ type: 'ADD_PLACE', payload: response.data }); // Assuming you have an ADD_PLACE action
      setSuccess(true);
      setPlaceDetails({
        name: '',
        tagline: '',
        description: '',
        image_url: '',
        location: '',
        average_price: '',
        opening_hours: '',
        website_url: '',
      });
    } catch (err) {
      console.error(err);
      setError('Failed to add place. Please check your input and try again.');
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Add New Place
      </Typography>
      <AnimatedGrid container spacing={3}>
        <Grid2 item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={placeDetails.name}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Tagline"
                name="tagline"
                value={placeDetails.tagline}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                name="description"
                value={placeDetails.description}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Image URL"
                name="image_url"
                value={placeDetails.image_url}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Location"
                name="location"
                value={placeDetails.location}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Average Price"
                name="average_price"
                value={placeDetails.average_price}
                onChange={handleChange}
                fullWidth
                required
                type="number"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Opening Hours"
                name="opening_hours"
                value={placeDetails.opening_hours}
                onChange={handleChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Website URL"
                name="website_url"
                value={placeDetails.website_url}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" type="submit">Add Place</Button>
              </Box>
              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              {success && <Typography color="success.main" sx={{ mt: 2 }}>Place added successfully!</Typography>}
            </form>
          </Paper>
        </Grid2>
      </AnimatedGrid>
    </StyledContainer>
  );
}

export default AddPlacePage;
