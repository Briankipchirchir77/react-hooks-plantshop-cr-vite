import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ plants, onAddPlant, searchQuery, onSearchChange }) {
  return (
    <main className="flex flex-col md:flex-row gap-6 p-4">
      <aside className="md:w-1/3 flex flex-col gap-6">
        <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
        <NewPlantForm onAddPlant={onAddPlant} />
      </aside>
      <section className="md:w-2/3 flex flex-col gap-4">
        <div className="text-gray-600 font-medium">
          <span className="text-green-600 font-bold text-lg">
            {plants.length}
          </span>{" "}
          {plants.length === 1 ? "specimen" : "specimens"} in collection
        </div>
        <PlantList plants={plants} />
      </section>
    </main>
  );
}

export default PlantPage;
