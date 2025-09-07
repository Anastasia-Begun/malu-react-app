import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBe4RtxN-33AvKTlylvBUzkk9Z5RuQ7Sac",
  authDomain: "malu-af0b0.firebaseapp.com",
  projectId: "malu-af0b0",
  storageBucket: "malu-af0b0.firebasestorage.app",
  messagingSenderId: "961583120487",
  appId: "1:961583120487:web:1c17a9d68701e0ab9094c2",
  measurementId: "G-HVJ8K3R3V2"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, auth, db, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext); 