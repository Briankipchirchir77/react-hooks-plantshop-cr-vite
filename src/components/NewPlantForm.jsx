import { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newPlant) => {
        onAddPlant(newPlant);

        setFormData({
          name: "",
          image: "",
          price: "",
        });
      });
  }

  return (
    <div className="new-plant-form p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-green-600">
        🌱 Add New Plant
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Add Plant
        </button>
      </form>
    </div>
  );
}

export default NewPlantForm;