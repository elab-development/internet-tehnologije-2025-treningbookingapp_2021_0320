import React, { useState } from "react";
import "./Card.css";
import Rating from "./Rating";

const Card = ({ data, onPurchase, user, exchangeRate }) => {
  const [showReviews, setShowReviews] = useState(false);
  const avg = Number(data.reviews_avg_rating ?? 0);
  const count = Number(data.reviews_count ?? 0);

  const handleRatingClick = () => {
    setShowReviews(!showReviews);
  };

  const handleBuyClick = () => {
    onPurchase(data);
  };

  const showBuyButton = !user || (user && !user.is_admin);

  let eurPrice = null;
  if (exchangeRate && data.price) {
    eurPrice = (data.price / exchangeRate).toFixed(2);
  }

  return (
    <div className="card">
      <img src={data.image_url} alt={data.title} className="card-img" />
      <div className="card-content">
        <h3>{data.title}</h3>
        <p>{data.description}</p>

        <p className="card-price">{data.price} RSD</p>

        {eurPrice && <p className="card-price-secondary">~ {eurPrice} EUR</p>}

        {showBuyButton && (
          <button className="btn" onClick={handleBuyClick}>
            Kupi
          </button>
        )}

        <div className="card-rating" onClick={handleRatingClick}>
          <Rating value={avg} />
          <span className="rating-count">({count})</span>
        </div>
      </div>

      {showReviews && data.reviews && data.reviews.length > 0 && (
        <div className="card-recensions">
          <h4>Recenzije</h4>
          <div className="recensions-list">
            {data.reviews.map((review) => (
              <div key={review.id} className="recension-item">
                <p>{review.comment}</p>
                <Rating value={review.rating} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
