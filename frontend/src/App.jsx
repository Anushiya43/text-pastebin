import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePaste from './components/CreatePaste';
import ViewPaste from './components/ViewPaste';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/:id" element={<ViewPaste />} />
      </Routes>
    </Router>
  );
}

export default App;
