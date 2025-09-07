import { useEffect, useState } from "react";
import { useFirebase } from "../firebase/FirebaseContext";
import {
  collection, query, where, onSnapshot,
  doc, getDoc, setDoc, updateDoc, deleteField
} from "firebase/firestore";

export default function ProfileModal({ isOpen, onClose }) {
  const { db, user, auth } = useFirebase();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [savingPhoto, setSavingPhoto] = useState(false);

  useEffect(() => {
    if (!isOpen || !user) return;

    const q = query(
      collection(db, "slots"),
      where("status", "==", "booked"),
      where("userUid", "==", user.uid)
    );

    const off = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        list.sort((a,b) => (a.start?.seconds || 0) - (b.start?.seconds || 0));
        setItems(list);
        setErr("");
      },
      (e) => setErr(e.message)
    );
    return () => off();
  }, [isOpen, user]);

  // Загрузка фото профиля из users/{email}
  useEffect(() => {
    const loadProfile = async () => {
      if (!isOpen || !user?.email) return;
      try {
        const ref = doc(db, "users", user.email);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfilePicture(snap.data()?.profilePicture || "");
        }
      } catch (e) {
        // не блокируем UI
        console.warn("load profile error", e);
      }
    };
    loadProfile();
  }, [isOpen, user, db]);

  const onPhotoChange = async (ev) => {
    const file = ev.target.files?.[0];
    if (!file || !user?.email) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      try {
        setSavingPhoto(true);
        setProfilePicture(String(base64));
        const ref = doc(db, "users", user.email);
        await setDoc(ref, { profilePicture: String(base64) }, { merge: true });
      } catch (e) {
        setErr("Ошибка сохранения фото профиля: " + (e?.message || e));
      } finally {
        setSavingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const cancel = async (id) => {
    try {
      await updateDoc(doc(db, "slots", id), {
        status: "free",
        user: deleteField(),
        bookedAt: deleteField(),
      });
    } catch (e) {
      setErr(e.message);
    }
  };

  const onBackdropClick = (e) => {
    console.log('ProfileModal backdrop clicked', e.target, e.currentTarget);
    if (e.target === e.currentTarget) {
      console.log('Closing ProfileModal');
      onClose();
    }
  };

  // Обработчик клика на document для закрытия модалки
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && e.target.classList.contains('modal-backdrop')) {
        console.log('Document click - closing ProfileModal');
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

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onBackdropClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {(profilePicture || user?.photoURL) && (
              <img src={profilePicture || user.photoURL} alt="Профиль" width={56} height={56} style={{ borderRadius: '50%', objectFit: 'cover' }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>{user?.displayName || user?.email || 'Профиль'}</strong>
              {user?.email && <span style={{ opacity: 0.75 }}>{user.email}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={async () => {
                try { await auth.signOut(); } catch(e) {}
                onClose();
              }}
              className="booking"
              style={{ background: 'transparent', border: '1px solid #888', color: '#fff', padding: '6px 10px' }}
            >
              Выйти
            </button>
            <button onClick={onClose}>×</button>
          </div>
        </div>

        <div style={{ margin: '10px 0 16px' }}>
          <label style={{ display: 'inline-block' }}>
            <span style={{ marginRight: 8 }}>Изменить фото:</span>
            <input type="file" accept="image/*" onChange={onPhotoChange} disabled={savingPhoto} />
          </label>
          {savingPhoto && <span style={{ marginLeft: 8, opacity: .8 }}>Сохранение…</span>}
        </div>

        {err && <div style={{ color: "#f66", marginBottom: 8 }}>
          Ошибка: {err}
        </div>}

        {items.length === 0 && (
          <div style={{ opacity: .7 }}>Записей пока нет.</div>
        )}

        {items.map(s => (
          <div key={s.id} className="slot-row" style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "8px 0", borderTop: "1px solid #eee"
          }}>
            <div>
              {s.start?.toDate?.().toLocaleString?.("ru-RU") || "—"}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => (window.location.href = "/book")}>
                Перенести
              </button>
              <button onClick={() => cancel(s.id)} style={{ background: "#f55", color: "#fff" }}>
                Отменить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
