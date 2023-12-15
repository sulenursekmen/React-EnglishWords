import "./App.css";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import A1Page from './components/A1Page';
import A2Page from './components/A2Page';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/a1" element={<A1Page />} />
        <Route path="/a2" element={<A2Page />} />
      </Routes>
    </div>
  );
}

export default App;
