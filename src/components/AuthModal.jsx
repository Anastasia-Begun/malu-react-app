import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebase/FirebaseContext';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { GoogleAuthProvider as ModularGoogleAuthProvider, signInWithPopup as modularSignInWithPopup, getAuth as modularGetAuth } from 'firebase/auth';

const AuthModal = ({ isOpen, onClose }) => {
  const { auth } = useFirebase();

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isOpen) return null;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(registerEmail, registerPassword);
      setRegisterError('');
      onClose();
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(loginEmail, loginPassword);
      setLoginError('');
      onClose();
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handleGoogle = async (setError) => {
    try {
      if (auth?.signInWithPopup) {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
      } else {
        const provider = new ModularGoogleAuthProvider();
        await modularSignInWithPopup(modularGetAuth(), provider);
      }
      onClose();
    } catch (error) {
      setError(error?.message || String(error));
    }
  };

  const onBackdropClick = (e) => {
    console.log('AuthModal backdrop clicked', e.target, e.currentTarget);
    if (e.target === e.currentTarget) {
      console.log('Closing AuthModal');
      onClose();
    }
  };

  // Обработчик клика на document для закрытия модалки
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && e.target.classList.contains('auth-modal')) {
        console.log('Document click - closing AuthModal');
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="auth-modal" onClick={onBackdropClick}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <section className="auth-section">
          <h1>Авторизация</h1>

          <div className="auth-container">
            <div className="auth-form-card">
              <h2>Регистрация</h2>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label htmlFor="register-email">Email:</label>
                  <input type="email" id="register-email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="register-password">Пароль:</label>
                  <input type="password" id="register-password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn-primary">Зарегистрироваться</button>
                <p className="error-message">{registerError}</p>
              </form>
              <button onClick={() => handleGoogle(setRegisterError)} className="btn-secondary">
                <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google" style={{ width: 20, height: 20 }} />
                Зарегистрироваться через Google
              </button>
            </div>

            <div className="auth-form-card">
              <h2>Вход</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="login-email">Email:</label>
                  <input type="email" id="login-email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="login-password">Пароль:</label>
                  <input type="password" id="login-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn-primary">Войти</button>
                <p className="error-message">{loginError}</p>
              </form>
              <button onClick={() => handleGoogle(setLoginError)} className="btn-secondary">
                <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google" style={{ width: 20, height: 20 }} />
                Войти через Google
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthModal;
