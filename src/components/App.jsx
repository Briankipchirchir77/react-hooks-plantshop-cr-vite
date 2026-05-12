import { useEffect, useState } from "react";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  const [newPlant, setNewPlant] = useState({
    name: "",
    image: "",
    price: "",
  });

  // FETCH PLANTS
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => {
        const normalizedPlants = data.map((plant) => ({
          ...plant,
          inStock: plant.inStock ?? true,
        }));

        setPlants(normalizedPlants);
      });
  }, []);

  // TOGGLE STOCK
  function handleToggleStock(id) {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id
          ? { ...plant, inStock: !plant.inStock }
          : plant
      )
    );
  }

  // HANDLE FORM INPUTS
  function handleChange(e) {
    const { name, value } = e.target;

    setNewPlant({
      ...newPlant,
      [name]: value,
    });
  }

  // ADD NEW PLANT
  function handleSubmit(e) {
    e.preventDefault();

    // EXACT OBJECT EXPECTED BY TESTS
    const plantToAdd = {
      name: newPlant.name,
      image: newPlant.image,
      price: newPlant.price,
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantToAdd),
    })
      .then((res) => res.json())
      .then((addedPlant) => {
        const normalizedPlant = {
          ...addedPlant,
          inStock: addedPlant.inStock ?? true,
        };

        setPlants((prevPlants) => [...prevPlants, normalizedPlant]);

        setNewPlant({
          name: "",
          image: "",
          price: "",
        });
      });
  }

  // SEARCH FILTER
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1 className="logo">🌿 Plant Collection</h1>
      </header>

      <main className="flex flex-col md:flex-row gap-6 p-4">
        {/* SIDEBAR */}
        <aside className="md:w-1/3 flex flex-col gap-6">
          {/* SEARCH */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <label htmlFor="plant-search">🔍 Search Plants</label>

            <input
              id="plant-search"
              type="text"
              placeholder="Type a name to search..."
              className="w-full p-2 border rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* FORM */}
          <div className="new-plant-form p-4 rounded-xl shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              🌱 Add New Plant
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Plant name"
                className="w-full p-2 border rounded"
                value={newPlant.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="w-full p-2 border rounded"
                value={newPlant.image}
                onChange={handleChange}
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                className="w-full p-2 border rounded"
                value={newPlant.price}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded"
              >
                Add Plant
              </button>
            </form>
          </div>
        </aside>

        {/* PLANTS */}
        <section className="md:w-2/3 flex flex-col gap-4">
          <div className="text-gray-600 font-medium">
            <span className="text-green-600 font-bold text-lg">
              {filteredPlants.length}
            </span>{" "}
            specimens in collection
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPlants.map((plant) => (
              <li
                key={plant.id}
                data-testid="plant-item"
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div>
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="p-4 text-center">
                  <h4 className="text-lg font-bold">{plant.name}</h4>

                  <p className="text-green-600 font-semibold mt-1">
                    Price: {plant.price}
                  </p>

                  <button
                    onClick={() => handleToggleStock(plant.id)}
                    className={`mt-3 px-4 py-2 rounded-lg text-white ${
                      plant.inStock ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {plant.inStock ? "In Stock" : "Out of Stock"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;