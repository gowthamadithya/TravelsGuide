// src/components/AttractionRow.js
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttractionCard from './AttractionCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ScrollableRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
}));

function AttractionRow({ title, attractions }) {
  const scrollRef = React.useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
          onClick={() => scroll(-300)}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <ScrollableRow ref={scrollRef} sx={{ pl: 6, pr: 6 }}>
          {attractions.map((attraction) => (
            <Box key={attraction.id} sx={{ flexShrink: 0, mr: 2 }}>
              <AttractionCard attraction={attraction} />
            </Box>
          ))}
        </ScrollableRow>
        <IconButton
          sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
          onClick={() => scroll(300)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default AttractionRow;
