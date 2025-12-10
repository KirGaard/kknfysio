import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { RequireAdmin } from './components/RequireAdmin';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Badge from './components/Badge';
import Home from './pages/Home';
import RytteranalysePage from './pages/RytteranalysePage';
import HoldOnlinePage from './pages/HoldOnlinePage';
import PriserPage from './pages/PriserPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminBookings from './pages/admin/AdminBookings';
import { content } from './data/content';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rytteranalyse" element={<RytteranalysePage />} />
            <Route path="/hold-online" element={<HoldOnlinePage />} />
            <Route path="/priser" element={<PriserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/events"
              element={
                <RequireAdmin>
                  <AdminEvents />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <RequireAdmin>
                  <AdminBookings />
                </RequireAdmin>
              }
            />
          </Routes>
          <Footer />
          <Badge 
            href={`tel:${content.contact.ctaPhone}`}
            ariaLabel="Ring til KKN Fysio"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
