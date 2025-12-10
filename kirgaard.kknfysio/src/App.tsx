import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Badge from './components/Badge';
import Home from './pages/Home';
import RytteranalysePage from './pages/RytteranalysePage';
import HoldOnlinePage from './pages/HoldOnlinePage';
import PriserPage from './pages/PriserPage';
import { content } from './data/content';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rytteranalyse" element={<RytteranalysePage />} />
          <Route path="/hold-online" element={<HoldOnlinePage />} />
          <Route path="/priser" element={<PriserPage />} />
        </Routes>
        <Footer />
        <Badge 
          href={`tel:${content.contact.ctaPhone}`}
          ariaLabel="Ring til KKN Fysio"
        />
      </div>
    </Router>
  );
}

export default App;
