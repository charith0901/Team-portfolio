import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProfileOverview from './components/innerComponenets/ProfileView';
import ProjectView from './components/innerComponenets/ProjectView';

const App = () => {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='member/:username' element={<ProfileOverview />} />
      <Route path='project/:title' element={<ProjectView/>} />
      {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;

