// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import AttractionDetailPage from './pages/AttractionDetailPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { Box, Typography } from '@mui/material';
import ProtectedRoutes from './Routes/AuthRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import AddPlacePage from './pages/AddPlacePage';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Use ProtectedRoutes for routes that require authentication */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/attraction/:placeId" element={<AttractionDetailPage />} />
                <Route path="/addplace" element={<AddPlacePage />} />
                {/* Add more protected routes here */}
              </Route>

              <Route path="*" element={
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="20vh">
                  <Typography variant="h1" color="error">404</Typography>
                  <Typography variant="h5">Oops! You found a dead link.</Typography>
                </Box>
              } />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
