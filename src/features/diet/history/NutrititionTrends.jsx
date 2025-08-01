import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker";

const NutritionTrends = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - replace with actual API data
  const nutritionData = {
    calories: {
      goal: 3000,
      consumed: 4000,
      unit: "Kcal"
    },
    protein: {
      goal: 50,
      consumed: 25,
      unit: "g"
    }
  };

  const getLeftAmount = (goal, consumed) => {
    const left = goal - consumed;
    return {
      value: Math.abs(left),
      isOver: left < 0,
      display: left < 0 ? `+${Math.abs(left)}` : left.toString()
    };
  };

  const getColorClass = (isOver) => {
    return isOver ? "text-orange-500" : "text-green-600";
  };

  return (
    <Card className="w-full pb-0 pt-4 overflow-hidden gap-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Nutrition Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-0">
        <div className="px-4">
          <DatePicker date={selectedDate} setDate={setSelectedDate} />
        </div>

        {/* Nutrition Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-xs px-2 font-semibold text-gray-900">
                  Fuel
                </th>
                <th className="text-center py-3 text-xs px-2 font-semibold text-gray-900">
                  Goal
                </th>
                <th className="text-center py-3 text-xs px-2 font-semibold text-gray-900">
                  Consumed
                </th>
                <th className="text-center py-3 text-xs px-2 font-semibold text-gray-900">
                  Left
                </th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {/* Calories Row */}
              <tr className="border-b border-gray-100">
                <td className="py-3 text-xs px-2 text-gray-900">
                  Calories ({nutritionData.calories.unit})
                </td>
                <td className="text-center py-3 text-xs px-2 text-green-600 font-medium">
                  {nutritionData.calories.goal.toLocaleString()}
                </td>
                <td className="text-center py-3 text-xs px-2 text-gray-900">
                  {nutritionData.calories.consumed.toLocaleString()}
                </td>
                <td className="text-center py-3 text-xs px-2 font-medium">
                  <span className={getColorClass(nutritionData.calories.consumed > nutritionData.calories.goal)}>
                    {getLeftAmount(nutritionData.calories.goal, nutritionData.calories.consumed).display}
                  </span>
                </td>
              </tr>

              {/* Protein Row */}
              <tr className="border-b border-gray-100">
                <td className="py-3 text-xs px-2 text-gray-900">
                  Protein ({nutritionData.protein.unit})
                </td>
                <td className="text-center py-3 text-xs px-2 text-green-600 font-medium">
                  {nutritionData.protein.goal}
                </td>
                <td className="text-center py-3 text-xs px-2 text-gray-900">
                  {nutritionData.protein.consumed}
                </td>
                <td className="text-center py-3 text-xs px-2 font-medium">
                  <span className={getColorClass(nutritionData.protein.consumed > nutritionData.protein.goal)}>
                    {getLeftAmount(nutritionData.protein.goal, nutritionData.protein.consumed).display}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionTrends;