import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import NutritionTrends from "./NutrititionTrends";
import Meals from "./Meals";

const DietHistory = () => {
    const navigate = useNavigate();

    const handleAddEntry = () => {
        navigate("/diet/add");
    }

  return (
    <div className="p-6 h-full overflow-y-auto hide-scrollbar">
      <div className="mb-8 relative">
        <h2 className="text-2xl font-bold text-gray-900">Diet History</h2>
        <p className="text-gray-600 mt-1">Track your nutrition trends and goals</p>
        <Button className="absolute right-0 top-0" onClick={handleAddEntry}>+ Add Entry</Button>
      </div>

      <div className="max-w-6xl space-y-6 mx-auto">
        <NutritionTrends />
        <Meals />
      </div>
    </div>
  );
};

export default DietHistory;