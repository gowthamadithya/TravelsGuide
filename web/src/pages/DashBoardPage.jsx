// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, CartesianGrid as LineCartesianGrid } from 'recharts';

// Styled Components
const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '30vh',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const UserCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const InsightsCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const mockUserDetails = {
  id: 1,
  name: 'John Doe',
  email: 'johndoe@example.com',
  created_at: '2020-01-15',
  trips_taken: 25,
};

const mockTravelInsights = {
  category_distribution: [
    { name: 'Adventure', value: 40 },
    { name: 'Beach', value: 20 },
    { name: 'Cultural', value: 15 },
    { name: 'Relaxation', value: 10 },
    { name: 'City', value: 15 },
  ],
  price_range_distribution: [
    { name: '$0 - $500', value: 60 },
    { name: '$500 - $1000', value: 30 },
    { name: '$1000 - $2000', value: 10 },
  ],
  top_locations: [
    { name: 'Paris, France', visits: 5 },
    { name: 'Tokyo, Japan', visits: 4 },
    { name: 'New York, USA', visits: 3 },
    { name: 'Rome, Italy', visits: 3 },
    { name: 'Sydney, Australia', visits: 2 },
  ],
  travel_activity_by_month: [
    { month: 'Jan', trips: 1 },
    { month: 'Feb', trips: 2 },
    { month: 'Mar', trips: 3 },
    { month: 'Apr', trips: 4 },
    { month: 'May', trips: 2 },
    { month: 'Jun', trips: 3 },
    { month: 'Jul', trips: 5 },
    { month: 'Aug', trips: 2 },
    { month: 'Sep', trips: 4 },
    { month: 'Oct', trips: 3 },
    { month: 'Nov', trips: 1 },
    { month: 'Dec', trips: 2 },
  ],
  travel_themes: [
    { name: 'Adventure', value: 40 },
    { name: 'Beach', value: 20 },
    { name: 'Family', value: 15 },
    { name: 'Honeymoon', value: 10 },
    { name: 'Relaxation', value: 15 },
  ],
};

const DashboardPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [travelInsights, setTravelInsights] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUserDetails(mockUserDetails);
    setTravelInsights(mockTravelInsights);
  }, []);

  // Pie Chart colors
  const pieChartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00c49f'];

  return (
    <StyledContainer maxWidth="lg">
      <HeroSection>
        <Typography variant="h3" gutterBottom>
          Welcome to Your Travel Dashboard, {userDetails?.name}!
        </Typography>
        <Typography variant="h5">Here are your travel insights.</Typography>
      </HeroSection>

      <Box sx={{ mb: 4 }}>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* User Profile Section */}
        {userDetails && (
          <UserCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                User Profile
              </Typography>
              <Typography variant="body1">Name: {userDetails.name}</Typography>
              <Typography variant="body1">Email: {userDetails.email}</Typography>
              <Typography variant="body1">Trips Taken: {userDetails.trips_taken}</Typography>
              <Typography variant="body1">Member Since: {userDetails.created_at}</Typography>
            </CardContent>
          </UserCard>
        )}

        {/* Travel Insights Section */}
        {travelInsights && (
          <>
            <Typography variant="h4" gutterBottom>
              Your Travel Insights
            </Typography>

            <Grid container spacing={4}>
              {/* Most Visited Categories Pie Chart */}
              <Grid item xs={12} md={6}>
                <InsightsCard>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Most Visited Categories
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={travelInsights.category_distribution}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                        >
                          {travelInsights.category_distribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </InsightsCard>
              </Grid>

              {/* Price Range Distribution Bar Chart */}
              <Grid item xs={12} md={6}>
                <InsightsCard>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Price Range Preferences
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={travelInsights.price_range_distribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </InsightsCard>
              </Grid>

              {/* Top Visited Locations Bar Chart */}
              <Grid item xs={12}>
                <InsightsCard>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Top Visited Locations
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={travelInsights.top_locations}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="visits" fill="#ff8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </InsightsCard>
              </Grid>

              {/* Travel Activity by Month Line Chart */}
              <Grid item xs={12}>
                <InsightsCard>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Travel Activity by Month
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={travelInsights.travel_activity_by_month}>
                        <Line type="monotone" dataKey="trips" stroke="#8884d8" />
                        <LineCartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </InsightsCard>
              </Grid>

              {/* Travel Themes Donut Chart */}
              <Grid item xs={12}>
                <InsightsCard>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Popular Travel Themes
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={travelInsights.travel_themes}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#00c49f"
                        >
                          {travelInsights.travel_themes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </InsightsCard>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </StyledContainer>
  );
};

export default DashboardPage;
