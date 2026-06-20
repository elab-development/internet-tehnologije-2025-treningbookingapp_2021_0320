import Card from "./Card";
import "./AllCards.css";

const AllCards = ({ dataC, onPurchase, user, exchangeRate }) => {
  if (!dataC || dataC.length === 0) {
    return <p style={{ textAlign: "center" }}>Nema proizvoda za prikaz.</p>;
  }

  return (
    <div className="all-cards-container">
      {dataC.map((item) => (
        <Card
          key={item.id}
          data={item}
          onPurchase={onPurchase}
          user={user}
          exchangeRate={exchangeRate}
        />
      ))}
    </div>
  );
};

export default AllCards;
