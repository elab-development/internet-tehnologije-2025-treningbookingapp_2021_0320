import { useState, useEffect } from "react";
import "./Categories.css";

const Categories = ({ categories = [], onCategoryClick }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allCategories = [{ id: null, name: "Sve" }, ...categories];

  return (
    <div className="cat-bar">
      {isMobile ? (
        <div className="dropdown-container">
          <button
            className="dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Kategorije
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {allCategories.map((c) => (
                <button
                  key={c.id ?? "all"}
                  className="dropdown-item"
                  onClick={() => {
                    onCategoryClick(c);
                    setDropdownOpen(false);
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        allCategories.map((c) => (
          <button
            key={c.id ?? "all"}
            className="cat-btn"
            onClick={() => onCategoryClick(c)}
          >
            {c.name}
          </button>
        ))
      )}
    </div>
  );
};

export default Categories;
