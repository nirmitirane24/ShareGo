import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js'
import WelcomePage from './WelcomePage'; // Import the new WelcomePage component
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
        <Route exact path="/login" element={<Login/>}> </Route>
        <Route exact path="/" element={<Register/>}> </Route>
        <Route path="/welcome" element={<WelcomePage />} /> {/* New route for WelcomePage */}
        </Routes>
      </div>
    </Router>
  );
}



export default App;
