// src/pages/SearchPage.js
import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid2 } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchFilters from '../components/SearchFilters';
import AttractionCard from '../components/AttractionCard';

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
const allAttractions = [
  { id: 1, name: 'Eiffel Tower', description: 'Iconic iron tower in Paris', image: 'https://example.com/eiffel.jpg' },
  { id: 2, name: 'Colosseum', description: 'Ancient amphitheater in Rome', image: 'https://example.com/colosseum.jpg' },
  { id: 3, name: 'Great Wall of China', description: 'Ancient fortification in northern China', image: 'https://example.com/greatwall.jpg' },
  { id: 4, name: 'Machu Picchu', description: 'Incan citadel in Peru', image: 'https://example.com/machupicchu.jpg' },
  { id: 4, name: 'Machu Picchu', description: 'Incan citadel in Peru', image: 'https://example.com/machupicchu.jpg' },
  { id: 4, name: 'Machu Picchu', description: 'Incan citadel in Peru', image: 'https://example.com/machupicchu.jpg' },
  { id: 4, name: 'Machu Picchu', description: 'Incan citadel in Peru', image: 'https://example.com/machupicchu.jpg' },
  { id: 4, name: 'Machu Picchu', description: 'Incan citadel in Peru', image: 'https://example.com/machupicchu.jpg' },
  { id: 4, name: 'Machu Picchu', description: 'Incan citadel in Peru', image: 'https://example.com/machupicchu.jpg' },
  { id: 4, name: 'Machu Picchu', description: 'Incan citadel in Peru', image: 'https://example.com/machupicchu.jpg' },
  // Add more attractions...
];

function SearchPage() {
  const [filters, setFilters] = useState({
    location: '',
    travelMode: 'any',
    priceRange: [0, 1000],
    maxDistance: 100,
  });

  // In a real application, you would use the filters to query your backend or filter the data
  const filteredAttractions = allAttractions;

  return (
    <StyledContainer maxWidth={false}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ my: 4 }}>
        Search Attractions
      </Typography>
      <AnimatedGrid container spacing={3}>
        <Grid2 item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <SearchFilters filters={filters} setFilters={setFilters} />
          </Paper>
        </Grid2>
        <Grid2 item xs={12} md={9}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {filteredAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </Box>
        </Grid2>
      </AnimatedGrid>
    </StyledContainer>
  );
}

export default SearchPage;


