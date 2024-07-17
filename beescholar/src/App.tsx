import React from 'react';
import './App.css';
import { Link, Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './views/homepage/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/home"
              element={<Homepage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
