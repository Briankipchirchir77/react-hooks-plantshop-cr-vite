import { useState } from "react";

function PlantCard({ plant }) {
  const [inStock, setInStock] = useState(true);

  function handleStockToggle() {
    setInStock((prev) => !prev);
  }

  return (
    <li
      data-testid="plant-item"
      className={`bg-white rounded-xl shadow-md overflow-hidden transition transform hover:scale-[1.02] ${
        !inStock ? "opacity-60" : ""
      }`}
    >
      <div className="relative">
        <img
          src={plant.image || "https://via.placeholder.com/400"}
          alt={plant.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/300px-Sunflower_from_Silesia2.jpg";
          }}
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
            SOLD OUT
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <h4 className="text-lg font-bold">{plant.name}</h4>
        <p className="text-green-600 font-semibold mt-1">
          ${Number(plant.price).toFixed(2)}
        </p>
        <button
          onClick={handleStockToggle}
          className={`mt-3 px-4 py-2 rounded-lg text-white transition ${
            inStock
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </button>
      </div>
    </li>
  );
}

export default PlantCard;
