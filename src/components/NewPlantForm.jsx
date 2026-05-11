import { useState } from "react";

const INITIAL_STATE = {
  name: "",
  image: "",
  price: "",
};

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      setError("Name and price are required.");
      return;
    }

    const plantData = {
      name: formData.name,
      image: formData.image || "https://via.placeholder.com/300",
      price: parseFloat(formData.price),
    };

    setLoading(true);

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plantData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((newPlant) => {
        onAddPlant(newPlant);
        setFormData(INITIAL_STATE);
      })
      .catch(() => setError("Failed to add plant. Is the server running?"))
      .finally(() => setLoading(false));
  }

  return (
    <div className="new-plant-form p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-green-600">
        🌱 Add New Plant
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="image"
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
        >
          {loading ? "Adding..." : "Add Plant"}
        </button>
      </form>
    </div>
  );
}

export default NewPlantForm;
