import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./AdminPanel.css";

const API_BASE = "http://localhost:8000/api";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fmtRSD = useMemo(
    () =>
      new Intl.NumberFormat("sr-RS", {
        style: "currency",
        currency: "RSD",
        maximumFractionDigits: 0,
      }),
    []
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Niste autorizovani za pristup ovom panelu.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_BASE}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const list = Array.isArray(res?.data?.data)
          ? res.data.data
          : res.data || [];
        setUsers(list || []);
      } catch (err) {
        console.error("Greška pri dohvatanju korisnika:", err);
        const msg =
          err?.response?.data?.message ||
          (err?.response?.status === 403
            ? "Nemate administratorska ovlašćenja."
            : "Greška pri učitavanju podataka. Proverite da li ste admin.");
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Učitavanje korisničkih podataka...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel — Pregled korisnika</h1>

      {users.length > 0 ? (
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>
                {user.username} ({user.email})
              </h3>
              <p>ID: {user.id}</p>
              <p>
                Registrovan:{" "}
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString("sr-RS")
                  : "-"}
              </p>

              <h4>Oglasi:</h4>
              {user?.products?.length ? (
                <ul>
                  {user.products.map((product) => (
                    <li key={product.id}>
                      <strong>{product.title}</strong> —{" "}
                      {typeof product.price === "number"
                        ? fmtRSD.format(product.price)
                        : `${product.price} RSD`}
                      <br />
                      Opis: {product.description ?? "-"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nema postavljenih oglasa.</p>
              )}

              <h4>Istorija kupovine:</h4>
              {user?.purchases?.length ? (
                <ul>
                  {user.purchases.map((purchase) => (
                    <li key={purchase.id}>
                      <strong>{purchase.title}</strong> — Kupljeno za:{" "}
                      {typeof purchase.price === "number"
                        ? fmtRSD.format(purchase.price)
                        : `${purchase.price} RSD`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nema zabeleženih kupovina.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Nema registrovanih korisnika.</p>
      )}
    </div>
  );
};

export default AdminPanel;
