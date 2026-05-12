function PlantCard({ plant, onToggleStock }) {
  const { id, name, image, price, inStock = true } = plant;

  return (
    <li className="bg-white rounded-xl shadow-md overflow-hidden" data-testid="plant-item">
      <div>
        <img src={image} alt={name} className="w-full h-48 object-cover" />
      </div>

      <div className="p-4 text-center">
        <h4 className="text-lg font-bold">{name}</h4>

        <p className="text-green-600 font-semibold mt-1">
          Price: {price}
        </p>

        <button
          onClick={() => onToggleStock(id)}
          className={`mt-3 px-4 py-2 rounded-lg text-white ${
            inStock ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </button>
      </div>
    </li>
  );
}

export default PlantCard;