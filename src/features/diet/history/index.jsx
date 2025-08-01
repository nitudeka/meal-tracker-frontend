import NutritionTrends from "./NutrititionTrends";

const DietHistory = () => {
  return (
    <div className="p-6 h-full overflow-y-auto hide-scrollbar">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Diet History</h2>
        <p className="text-gray-600 mt-1">Track your nutrition trends and goals</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <NutritionTrends />
      </div>
    </div>
  );
};

export default DietHistory;