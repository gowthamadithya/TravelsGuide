import React from 'react';
// import './Banner.css';

function Banner() {
  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("/path-to-banner-image.jpg")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">Discover Amazing Places</h1>
        <div className="banner__buttons">
          <button className="banner__button">Explore</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          Find your next adventure from thousands of attractions worldwide!
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;