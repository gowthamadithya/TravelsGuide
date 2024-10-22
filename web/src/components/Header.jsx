// // src/components/Header.js
// import React, { useState } from 'react';
// import { AppBar, Toolbar, Typography, InputBase, IconButton, Menu, MenuItem, Box, Popper, Grow, Paper } from '@mui/material';
// import { styled, alpha } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import { Link, useNavigate } from 'react-router-dom';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// function Header() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchValue, setSearchValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [anchorSuggestions, setAnchorSuggestions] = useState(null);
//   const navigate = useNavigate();

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSearchChange = (event) => {
//     const value = event.target.value;
//     setSearchValue(value);
//     // Mock suggestion logic - replace with actual API call in a real application
//     const mockSuggestions = ['Paris', 'Rome', 'New York', 'Tokyo'].filter(city =>
//       city.toLowerCase().includes(value.toLowerCase())
//     );
//     setSuggestions(mockSuggestions);
//     setAnchorSuggestions(event.currentTarget);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchValue(suggestion);
//     setSuggestions([]);
//     setAnchorSuggestions(null);
//     navigate(`/attraction/${suggestion.toLowerCase().replace(/\s/g, '-')}`);
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
//           Travelers-IN
//         </Typography>
//         <Search>
//           <SearchIconWrapper>
//             <SearchIcon />
//           </SearchIconWrapper>
//           <StyledInputBase
//             placeholder="Search attractions..."
//             inputProps={{ 'aria-label': 'search' }}
//             value={searchValue}
//             onChange={handleSearchChange}
//           />
//           <Popper
//             open={suggestions.length > 0}
//             anchorEl={anchorSuggestions}
//             placement="bottom-start"
//             transition
//           >
//             {({ TransitionProps }) => (
//               <Grow {...TransitionProps}>
//                 <Paper>
//                   <Box sx={{ bgcolor: 'background.paper', maxHeight: 200, overflow: 'auto' }}>
//                     {suggestions.map((suggestion, index) => (
//                       <MenuItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
//                         {suggestion}
//                       </MenuItem>
//                     ))}
//                   </Box>
//                 </Paper>
//               </Grow>
//             )}
//           </Popper>
//         </Search>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="menu-appbar"
//           aria-haspopup="true"
//           onClick={handleMenu}
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorEl}
//           anchorOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//           keepMounted
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
//           <MenuItem onClick={handleClose}>Logout</MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Header;








import React, { useState, useRef, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Paper,
  Modal,
  Fade,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, api } from '../api/ApiService';
import { StoreContext } from '../Store/Store';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const ClearButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: '50%',
  transform: 'translateY(-50%)',
}));

const ModalSearch = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90%',
  maxWidth: 600,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  outline: 'none',
  borderRadius: theme.shape.borderRadius,
}));

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [places, setPlaces] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const {state, dispatch } = useContext(StoreContext)
  const authDetails = state.auth

  const fetchPlaces = async () => {
    try {
      const response = await api.get(`${BASE_URL}api/places/`, {
        headers: {
          Authorization: `Bearer ${authDetails.access}`,
        },
      });
      setPlaces(response.data);
    } catch (err) {
      console.error('Failed to fetch places:', err);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      await api.post(`${BASE_URL}api/logout/`, {}, {
        headers: {
          Authorization: `Bearer ${authDetails.access}`,
        },
      });
      // localStorage.removeItem('access_token');
      // localStorage.removeItem('refresh_token');
      dispatch({ type: 'ADD_AUTH', payload: {} })
      navigate('/login');
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setSuggestions(places.filter(item => item.name.toLowerCase().includes(value.toLowerCase())));
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/attraction/${suggestion.id}`);
    handleCloseSearch();
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSuggestions([]);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
    fetchPlaces();
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
    setSearchValue('');
    setSuggestions([]);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' && searchValue) {
      event.preventDefault();
      navigate(`/attraction/${searchValue.toLowerCase().replace(/\s/g, '-')}`);
      handleCloseSearch();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Travelers-IN
        </Typography>
        <IconButton color="inherit" onClick={handleOpenSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)} component={Link} to="/profile">Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
      <Modal open={openSearch} onClose={handleCloseSearch} closeAfterTransition>
        <Fade in={openSearch}>
          <ModalSearch onKeyPress={handleSearchSubmit}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearch}
                autoFocus
                inputProps={{ 'aria-label': 'search' }}
              />
              {searchValue && (
                <ClearButton size="small" onClick={handleClearSearch}>
                  <ClearIcon fontSize="small" />
                </ClearButton>
              )}
            </Search>
            {suggestions.length > 0 && (
              <Paper sx={{ mt: 1, maxHeight: 300, overflow: 'auto' }}>
                {suggestions.map((suggestion) => (
                  <MenuItem key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion.name}
                  </MenuItem>
                ))}
              </Paper>
            )}
          </ModalSearch>
        </Fade>
      </Modal>
    </AppBar>
  );
}

export default Header;

