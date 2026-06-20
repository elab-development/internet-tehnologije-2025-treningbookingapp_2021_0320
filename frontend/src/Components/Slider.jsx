// src/Components/Slider.jsx

import React, { useState } from "react";
import "./Slider.css";

const Slider = ({ data }) => {
  const [dataIndex, setDataIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = dataIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : dataIndex - 1;
    setDataIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = dataIndex === data.length - 1;
    const newIndex = isLastSlide ? 0 : dataIndex + 1;
    setDataIndex(newIndex);
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="slider-container">
      <div className="slider-nav">
        <button className="slider-btn" onClick={goToPrevious}>
          &lt;
        </button>
        <button className="slider-btn" onClick={goToNext}>
          &gt;
        </button>
      </div>
      <img src={data[dataIndex].url} alt="Slider" className="slider-image" />
    </div>
  );
};

export default Slider;
