import React from "react";
import "./PurchaseForm.css";

const PurchaseForm = ({ onConfirm, onCancel, product }) => {
  const handlePurchaseConfirmation = () => {
    onConfirm(product.id);
    onCancel();
  };

  const qrData = `KUPI: ${product.title} ID:${product.id} CENA:${product.price} RSD`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    qrData
  )}`;

  return (
    <div className="purchase-form-overlay">
      <div className="purchase-form-container">
        <h3>Plaćanje proizvoda: {product.title}</h3>
        <p>Cena: {product.price} RSD</p>
        <hr />

        <h4 style={{ margin: "20px 0 10px 0" }}>Skenirajte za uplatu</h4>
        <img
          src={qrCodeUrl}
          alt="QR kod za placanje"
          className="qr-code-image"
        />

        <p style={{ fontSize: "0.85em", color: "#666", marginTop: "15px" }}>
          *Skenirajte kod koristeći mobilnu aplikaciju banke ili skener.
        </p>

        <div className="form-actions" style={{ justifyContent: "center" }}>
          <button
            type="button"
            onClick={handlePurchaseConfirmation}
            className="confirm-btn"
          >
            Potvrdi skeniranje i kupovinu
          </button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            Odustani
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;
