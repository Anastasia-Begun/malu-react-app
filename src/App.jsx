import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import ServicesModal from './components/ServicesModal';
import ProfileModal from './components/ProfileModal';

import HomePage from './pages/HomePage';
import MakeupPage from './pages/MakeupPage';
import HaircutPage from './pages/HaircutPage';
import ManicurePage from './pages/ManicurePage';
import PedicurePage from './pages/PedicurePage';
import ContactsPage from './pages/ContactsPage';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // пресет услуги/подпункта, который прилетает из offer-карточек
  const [preset, setPreset] = useState({ service: null, subService: null });

  const handleSelectOffer = ({ service, subService }) => {
    setPreset({ service, subService });
    setShowServicesModal(true);
  };

  return (
    <Router>
      <div className="maxwidth-theme">
        <Navbar
          onOpenAuthModal={() => setShowAuthModal(true)}
          onOpenServicesModal={() => setShowServicesModal(true)}
          onOpenProfileModal={() => setShowProfileModal(true)}
        />

        {/* передаем onSelectOffer на страницы, где есть спецпредложения */}
        <Routes>
          <Route path="/" element={<HomePage onSelectOffer={handleSelectOffer} />} />
          <Route path="/makeup" element={<MakeupPage onSelectOffer={handleSelectOffer} />} />
          <Route path="/haircut" element={<HaircutPage onSelectOffer={handleSelectOffer} />} />
          <Route path="/manicure" element={<ManicurePage onSelectOffer={handleSelectOffer} />} />
          <Route path="/pedicure" element={<PedicurePage onSelectOffer={handleSelectOffer} />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        <ServicesModal
          isOpen={showServicesModal}
          onClose={() => setShowServicesModal(false)}
          initialService={preset.service}
          initialSubService={preset.subService}
        />
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
        />
      </div>
    </Router>
  );
}

export default App;
