import { useEffect, useState } from "react";
import { useFirebase } from "../firebase/FirebaseContext";
import {
  collection, query, where, onSnapshot,
  doc, updateDoc, deleteField
} from "firebase/firestore";

export default function ProfileModal({ isOpen, onClose }) {
  const { db, user } = useFirebase();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

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
        <div className="modal-header">
          <h3>Мои записи</h3>
          <button onClick={onClose}>×</button>
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
