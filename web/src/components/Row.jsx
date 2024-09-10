import React from 'react';
// import './Row.css';

function Row({ title, attractions, setSelectedAttraction }) {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {attractions.map((attraction) => (
          <img
            key={attraction.id}
            className="row__poster"
            src={attraction.image}
            alt={attraction.name}
            onClick={() => setSelectedAttraction(attraction)}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;