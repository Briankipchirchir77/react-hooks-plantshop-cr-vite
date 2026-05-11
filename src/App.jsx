import { useState, useEffect } from "react";
import Header from "./components/Header";
import PlantPage from "./components/PlantPage";
import "./index.css";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch plants from the API or use sample data
  useEffect(() => {
    // Uncomment the following block to use the real API
    /*
    fetch("http://localhost:6001/plants")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setPlants(data);
      })
      .catch((err) => {
        console.error("Failed to fetch plants:", err);
        // You can set some fallback data here if needed
        setPlants([]); // Clear the plants on error or set to sample data
      });
    */

    // Temporary sample data for testing
    const sampleData = [
      { id: 1, name: "Rose", image: "https://example.com/rose.jpg", price: 5.00 },
      { id: 2, name: "Tulip", image: "https://example.com/tulip.jpg", price: 3.00 },
      { id: 3, name: "Sunflower", image: "https://example.com/sunflower.jpg", price: 4.00 },
      { id: 4, name: "Daisy", image: "https://example.com/daisy.jpg", price: 2.50 },
    ];
    setPlants(sampleData);
  }, []);

  // Add plant
  function handleAddPlant(newPlant) {
    setPlants((prev) => [...prev, newPlant]);
  }

  // Filter plants based on search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <PlantPage
        plants={filteredPlants}
        onAddPlant={handleAddPlant}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
}

export default App;
