import React, { useState } from 'react';
// import './SearchPage.css';

function SearchPage() {

  const [allPlaces, setAllPlaces] = useState([])
  const [filRes, setFilres] = useState([])


  const [filters, setFilters] = useState({
    location: '',
    price: '',
    distance: '',
    travelMode: '',
    type: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const applyFilters = () => {
    const results = attractions.filter(attraction => {
      return (
        (!filters.location || attraction.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.price || attraction.price <= parseInt(filters.price)) &&
        (!filters.distance || attraction.distance <= parseInt(filters.distance)) &&
        (!filters.travelMode || attraction.travelMode.includes(filters.travelMode)) &&
        (!filters.type || attraction.type === filters.type)
      );
    });
    setFilres(results);
  };

  return (
    <div className="search-page">
      <h1>Search Attractions</h1>
      <div className="filters">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          value={filters.price}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="distance"
          placeholder="Max Distance"
          value={filters.distance}
          onChange={handleFilterChange}
        />
        <select name="travelMode" value={filters.travelMode} onChange={handleFilterChange}>
          <option value="">Travel Mode</option>
          <option value="Walk">Walk</option>
          <option value="Bus">Bus</option>
          <option value="Taxi">Taxi</option>
        </select>
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">Attraction Type</option>
          <option value="Monument">Monument</option>
          <option value="Nature">Nature</option>
          <option value="Museum">Museum</option>
          <option value="Adventure">Adventure</option>
          <option value="Relaxation">Relaxation</option>
        </select>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      {/* Display search results here */}
    </div>
  );
}

export default SearchPage;