/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PetDetailsPage from './pages/PetDetailsPage';
import ProfilePage from './pages/ProfilePage';
import AdoptionFormPage from './pages/AdoptionFormPage';
import MessagesPage from './pages/MessagesPage';
import ChatDetailPage from './pages/ChatDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import BottomNav from './components/BottomNav';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pet/:id" element={<PetDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/adopt/:id" element={<AdoptionFormPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/chat/:id" element={<ChatDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
          <BottomNavWrapper />
        </div>
      </Router>
    </AppProvider>
  );
}

function BottomNavWrapper() {
  const location = useLocation();
  const hideNavOn = ['/pet/', '/adopt/', '/chat/'];
  const shouldHide = hideNavOn.some(path => location.pathname.startsWith(path));
  
  if (shouldHide) return null;
  return <BottomNav />;
}
