import React, { useState } from "react";

function FilterBox({ menu, onSelect }) {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleItemClick = (category) => {
    // Om samma kategori klickas igen, avmarkera den
    if (selectedFilter === category) {
      setSelectedFilter(null); // Avmarkera kategorin
      onSelect(menu); // Visa alla kategorier
    } else {
      setSelectedFilter(category);
      const categoryItems = menu.filter((item) => item.category === category);
      onSelect(categoryItems);
    }
  };

  return (
    <div>
      <div className="filter-box">
        <div
          className={`filter-item ${
            selectedFilter === "burgers" ? "selected" : ""
          }`}
          onClick={() => handleItemClick("burgers")}
        >
          <label>Burgers</label>
        </div>
        <div
          className={`filter-item ${
            selectedFilter === "sides" ? "selected" : ""
          }`}
          onClick={() => handleItemClick("sides")}
        >
          <label>Sides</label>
        </div>
        <div
          className={`filter-item ${
            selectedFilter === "drinks" ? "selected" : ""
          }`}
          onClick={() => handleItemClick("drinks")}
        >
          <label>Drinks</label>
        </div>
        <div
          className={`filter-item ${
            selectedFilter === "desserts" ? "selected" : ""
          }`}
          onClick={() => handleItemClick("desserts")}
        >
          <label>Desserts</label>
        </div>
      </div>
      <div>
        {/* Här kan du lägga till ytterligare innehåll som ska visas under filtreringsknapparna */}
      </div>
    </div>
  );
}

export default FilterBox;
