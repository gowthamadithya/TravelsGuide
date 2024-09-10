// src/components/SearchFilters.js
import React from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Slider, Typography } from '@mui/material';

function SearchFilters({ filters, setFilters }) {
  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <TextField
        label="Location"
        name="location"
        value={filters.location}
        onChange={handleChange}
      />
      <FormControl fullWidth>
        <InputLabel id="travel-mode-label">Mode of Travel</InputLabel>
        <Select
          labelId="travel-mode-label"
          name="travelMode"
          value={filters.travelMode}
          onChange={handleChange}
        >
          <MenuItem value="any">Any</MenuItem>
          <MenuItem value="car">Car</MenuItem>
          <MenuItem value="public">Public Transport</MenuItem>
          <MenuItem value="walking">Walking</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          name="priceRange"
          value={filters.priceRange}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </Box>
      <TextField
        label="Max Distance (km)"
        name="maxDistance"
        type="number"
        value={filters.maxDistance}
        onChange={handleChange}
      />
    </Box>
  );
}

export default SearchFilters;
