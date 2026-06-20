import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PurchasedProductCard from "./PurchasedProductCard";
import "./PurchaseHistory.css";

const PurchaseHistory = ({ user, exchangeRate, onUnauthorizedLogout }) => {
  const [activities, setActivities] = useState({ purchases: [], sales: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError(
          "Morate biti prijavljeni da biste videli istoriju aktivnosti."
        );
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/activities",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.purchases || response.data.sales) {
          setActivities({
            purchases: response.data.purchases || [],
            sales: response.data.sales || [],
          });
        } else {
          setError(
            "Greška u formatu podataka sa servera. Molimo proverite backend log."
          );
        }
      } catch (err) {
        console.error("Greška pri dohvatanju aktivnosti:", err);

        if (
          err.response &&
          err.response.status === 401 &&
          onUnauthorizedLogout
        ) {
          setError("Vaša sesija je istekla. Automatski se odjavljujete...");
          setTimeout(() => {
            onUnauthorizedLogout();
          }, 1500);
          return;
        }

        setError(
          "Greška pri dohvatanju istorije aktivnosti. Molimo pokušajte ponovo."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [onUnauthorizedLogout]);

  if (loading) {
    return <div className="loading">Učitavanje istorije aktivnosti...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const allActivities = [
    ...(activities.purchases || []).map((p) => ({
      ...p,
      type: "PURCHASE",
      date: p.pivot?.purchased_at || p.created_at,
    })),
    ...(activities.sales || []).map((s) => ({
      ...s,
      type: "SALE",
      date: s.pivot?.purchased_at || s.created_at,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="purchase-history-container">
      <Link to="/" className="back-link">
        &larr; Povratak na početnu stranicu
      </Link>
      <h2>Zdravo, {user?.name || user?.username}!</h2>
      <h3>Istorija aktivnosti</h3>
      {exchangeRate && (
        <p
          style={{ fontSize: "0.9em", color: "#007bff", marginBottom: "15px" }}
        >
          Trenutni kurs: 1 EUR ≈ {exchangeRate.toFixed(2)} RSD
        </p>
      )}

      {allActivities.length > 0 ? (
        <div className="purchased-products-grid">
          {allActivities.map((activity) => (
            <PurchasedProductCard
              key={activity.id + activity.type + activity.date}
              product={activity}
              activityType={activity.type}
              activityDate={activity.date}
              exchangeRate={exchangeRate}
            />
          ))}
        </div>
      ) : (
        <div className="no-purchases">
          <p>Trenutno nema aktivnosti kupovine ili prodaje.</p>
          <p>Proverite da li ste obavili kupovinu.</p>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
