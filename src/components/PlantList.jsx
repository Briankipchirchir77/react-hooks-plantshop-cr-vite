import PlantCard from "./PlantCard";

function PlantList({ plants }) {
  // Check if there are no plants
  if (!plants || plants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <span className="text-4xl">🌱</span>
        <p className="text-lg font-semibold mt-2">No specimens found</p>
        <small>Try a different search or add a new plant</small>
      </div>
    );
  }

  // Render the list of plants
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </ul>
  );
}

export default PlantList;
