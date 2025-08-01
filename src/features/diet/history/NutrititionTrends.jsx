import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker";
import { useDailyNutrition } from "@/hooks";
import { format } from "date-fns";

const NutritionTrends = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format date for API
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  
  // Fetch nutrition data from API
  const { data: nutritionData, isLoading, error } = useDailyNutrition(formattedDate);

  // Static goals - can be made dynamic later
  const nutritionGoals = {
    calories: 3000,
    protein: 50
  };

  // Combine API data with goals
  const combinedData = {
    calories: {
      goal: nutritionGoals.calories,
      consumed: nutritionData?.calories || 0,
      unit: "Kcal"
    },
    protein: {
      goal: nutritionGoals.protein,
      consumed: nutritionData?.protein || 0,
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
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading nutrition data...</div>
            </div>
          )}
          
          {error && (
            <div className="flex justify-center items-center py-8">
              <div className="text-red-500">Failed to load nutrition data</div>
            </div>
          )}
          
          {!isLoading && !error && (
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
                    Calories ({combinedData.calories.unit})
                  </td>
                  <td className="text-center py-3 text-xs px-2 text-green-600 font-medium">
                    {combinedData.calories.goal.toLocaleString()}
                  </td>
                  <td className="text-center py-3 text-xs px-2 text-gray-900">
                    {combinedData.calories.consumed.toLocaleString()}
                  </td>
                  <td className="text-center py-3 text-xs px-2 font-medium">
                    <span className={getColorClass(combinedData.calories.consumed > combinedData.calories.goal)}>
                      {getLeftAmount(combinedData.calories.goal, combinedData.calories.consumed).display}
                    </span>
                  </td>
                </tr>

                {/* Protein Row */}
                <tr className="border-b border-gray-100">
                  <td className="py-3 text-xs px-2 text-gray-900">
                    Protein ({combinedData.protein.unit})
                  </td>
                  <td className="text-center py-3 text-xs px-2 text-green-600 font-medium">
                    {combinedData.protein.goal}
                  </td>
                  <td className="text-center py-3 text-xs px-2 text-gray-900">
                    {combinedData.protein.consumed}
                  </td>
                  <td className="text-center py-3 text-xs px-2 font-medium">
                    <span className={getColorClass(combinedData.protein.consumed > combinedData.protein.goal)}>
                      {getLeftAmount(combinedData.protein.goal, combinedData.protein.consumed).display}
                    </span>
                  </td>
                </tr>
                          </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionTrends;