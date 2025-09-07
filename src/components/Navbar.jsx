import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebase/FirebaseContext';
import { NavLink } from 'react-router-dom';

const Navbar = ({ onOpenAuthModal, onOpenServicesModal, onOpenProfileModal }) => {
  const { user, auth } = useFirebase();
  const [userEmail, setUserEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    setUserEmail(user ? (user.email || user.displayName || '') : '');
    setPhotoUrl(user?.photoURL || '');
  }, [user]);

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.error('Sign out error', e);
    }
  };

  const handleOpenBooking = (e) => {
    e.preventDefault();
    if (user) {
      onOpenServicesModal();
    } else {
      onOpenAuthModal();
    }
  };

  return (
    <nav className="topbar" aria-label="Главное меню">
      <ul aria-label="разделы">
        <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''} end>Главная</NavLink></li>
<li><NavLink to="/makeup" className={({isActive}) => isActive ? 'active' : ''}>Макияж</NavLink></li>
<li><NavLink to="/haircut" className={({isActive}) => isActive ? 'active' : ''}>Стрижка волос</NavLink></li>
<li><NavLink to="/manicure" className={({isActive}) => isActive ? 'active' : ''}>Маникюр</NavLink></li>
<li><NavLink to="/pedicure" className={({isActive}) => isActive ? 'active' : ''}>Педикюр</NavLink></li>
<li><NavLink to="/contacts" className={({isActive}) => isActive ? 'active' : ''}>Контакты</NavLink></li>

      </ul>

      <div className="auth-controls" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {user ? (
          <div
            role="button"
            title="Открыть профиль"
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            onClick={() => onOpenProfileModal && onOpenProfileModal()}
          >
            {photoUrl && (
              <img
                src={photoUrl}
                alt="Профиль"
                width={28}
                height={28}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            )}
            <span id="user-email-display" style={{ textDecoration: 'underline' }}>
              {userEmail}
            </span>
          </div>
        ) : (
          <a className="booking" href="#" onClick={onOpenAuthModal}>
            Войти
          </a>
        )}

        <a className="booking" href="#" onClick={handleOpenBooking}>
          Запись на прием
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
