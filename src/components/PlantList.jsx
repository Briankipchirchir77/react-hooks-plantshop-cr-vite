import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleStock }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onToggleStock={onToggleStock}
        />
      ))}
    </ul>
  );
}

export default PlantList;