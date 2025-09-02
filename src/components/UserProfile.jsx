import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, collection, query, where, orderBy, getDocs, deleteDoc } from 'firebase/firestore';

const UserProfile = ({ user, firebaseAuth, firestoreDb }) => {
  const [profilePicture, setProfilePicture] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDataAndBookings = async () => {
      if (user && firestoreDb) {
        setLoading(true);
        try {
          // Fetch profile picture
          const userDocRef = doc(firestoreDb, 'users', user.email);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setProfilePicture(userDocSnap.data().profilePicture || '');
          }

          // Fetch bookings
          const bookingsRef = collection(firestoreDb, 'bookings');
          const q = query(bookingsRef, where('userEmail', '==', user.email), orderBy('timestamp', 'desc'));
          const querySnapshot = await getDocs(q);
          const userBookings = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBookings(userBookings);

        } catch (err) {
          console.error("Error fetching user data or bookings:", err);
          setError('Не удалось загрузить данные пользователя или бронирования.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDataAndBookings();
  }, [user, firestoreDb]);

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (file && user && firestoreDb) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        try {
          const userDocRef = doc(firestoreDb, 'users', user.email);
          await updateDoc(userDocRef, {
            profilePicture: base64String,
          });
          setProfilePicture(base64String);
          alert('Фото профиля успешно загружено!');
        } catch (err) {
          console.error("Error uploading profile picture:", err);
          setError('Ошибка при загрузке фото профиля.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Вы уверены, что хотите отменить эту запись?')) {
      try {
        await deleteDoc(doc(firestoreDb, 'bookings', bookingId));
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        alert('Запись успешно отменена.');
      } catch (err) {
        console.error("Error canceling booking:", err);
        setError('Ошибка при отмене записи.');
      }
    }
  };

  if (loading) {
    return <p>Загрузка профиля...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
  }

  if (!user) {
    return <p>Пожалуйста, войдите, чтобы просмотреть свой профиль.</p>;
  }

  return (
    <div className="user-profile-section">
      <h3>Личный кабинет для {user.email}</h3>
      <div className="profile-picture-section">
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <div className="no-profile-picture">Нет фото профиля</div>
        )}
        <input type="file" accept="image/*" onChange={handleProfilePictureUpload} />
      </div>

      <h3>Ваши записи:</h3>
      {bookings.length > 0 ? (
        <div className="booking-list-section">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <p><strong>Услуга:</strong> {booking.service}</p>
              <p><strong>Дата:</strong> {new Date(booking.date).toLocaleString()}</p>
              <button onClick={() => handleCancelBooking(booking.id)} className="btn-secondary">Отменить запись</button>
              {/* <button className="btn-secondary">Перенести запись</button> */}
            </div>
          ))}
        </div>
      ) : (
        <p>У вас пока нет записей.</p>
      )}
    </div>
  );
};

export default UserProfile; 