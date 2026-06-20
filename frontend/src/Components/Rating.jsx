import "./Rating.css";

const Rating = ({ value = 0, outOf = 5, showValue = false }) => {
  const filled = Math.floor(value);
  const hasHalf = value - filled >= 0.5;

  const stars = [];
  for (let i = 1; i <= outOf; i++) {
    let cls = "star";
    if (i <= filled) cls += " filled";
    else if (i === filled + 1 && hasHalf) cls += " half";
    stars.push(
      <span key={i} className={cls} aria-hidden="true">
        ★
      </span>
    );
  }

  return (
    <div className="rating">
      {stars}
      {showValue && <span className="rating-text">{value.toFixed(1)}</span>}
    </div>
  );
};

export default Rating;
