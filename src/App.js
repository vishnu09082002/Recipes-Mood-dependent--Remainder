import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import VegMenu from './VegMenu';
import FriedFood from './FriedFood';
import SweetItems from './SweetItems';
import NonVeg from './Non-Veg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<VegMenu />} />
          <Route path="/fried-food" element={<FriedFood />} />
          <Route path="/sweet-items" element={<SweetItems />} />
          <Route path="/mixed" element={<NonVeg />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;