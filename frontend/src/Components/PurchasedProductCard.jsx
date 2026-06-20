import React from "react";
import { Link } from "react-router-dom";
import "./PurchaseHistory.css";

const PurchasedProductCard = ({
  product,
  activityType,
  activityDate,
  exchangeRate,
}) => {
  const isPurchased = activityType === "PURCHASE";
  const labelText = isPurchased ? "Kupljeno" : "Prodato";
  const labelClass = isPurchased ? "purchased-label" : "sold-label";

  const date = activityDate
    ? new Date(activityDate).toLocaleDateString()
    : "N/A";

  const price = product.price || product.pivot?.price;
  let eurPrice = null;

  if (exchangeRate && price) {
    eurPrice = (price / exchangeRate).toFixed(2);
  }

  return (
    <div className="product-card purchased-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img
          src={product.image_url}
          alt={product.title}
          className="product-image"
        />

        <div className="product-details">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-location">{product.location}</p>

          <div className="product-price">{price} RSD</div>

          {eurPrice && (
            <p className="product-price-secondary">(~ {eurPrice} EUR)</p>
          )}

          <div className="product-footer">
            <span className={labelClass}>{labelText}</span>

            <p className="activity-date">
              {isPurchased ? "Kupljeno:" : "Prodato:"} {date}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PurchasedProductCard;
