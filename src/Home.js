import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Food Explorer</h1>
      <div className="categories">
        <Link to="/veg" className="category veg">VEG</Link>
        <Link to="/mixed" className="category non-veg">NON-VEG</Link>
        <Link to="/sweet-items" className="category">SWEET-ITEMS</Link>
        <Link to="/fried-food" className="category">FRIED-FOOD</Link>
      </div>
      <div className="mood-section">
        <h3>What's your mood?</h3>
        <div className="moods">
          <Link to="/fried-food" className="mood angry">Angry</Link>
          <Link to="/fried-food" className="mood happy">Happy</Link>
          <Link to="/sweet-items" className="mood sad">Sad</Link>
          <Link to="/mixed" className="mood neutral">Neutral</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;