import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subDays } from "date-fns";
import { useMealsHistory } from "@/hooks";

const Meals = () => {
  // Fetch meals history from API
  const { data: mealsData, isLoading, error } = useMealsHistory();

  const getDayLetter = (dateString) => {
    const date = new Date(dateString);
    return format(date, "E")[0].toUpperCase(); // First letter of day name
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d MMM");
  };

  const getMealTypeLabel = (mealType) => {
    const labels = {
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      snack: "Snack"
    };
    return labels[mealType] || mealType;
  };

  const getMealsGridClassName = () => {
    const classNamesMap = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
    }
    return classNamesMap[mealsData.length] || "grid-cols-1";
  }

  return (
    <Card className="w-full pb-0 overflow-hidden gap-2 pt-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Meals History
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading && (
          <div className="flex justify-center items-center pb-8">
            <div className="text-gray-500">Loading meals history...</div>
          </div>
        )}
        
        {error && (
          <div className="flex justify-center items-center pb-8">
            <div className="text-red-500">Failed to load meals history</div>
          </div>
        )}
        
        {!isLoading && !error && mealsData && (
          <div className={`grid ${getMealsGridClassName()} border-t border-gray-200`}>
            {mealsData.map((dayData, index) => (
            <div
              key={dayData.date}
              className={` ${
                index < mealsData.length - 1 ? "border-r" : ""
              }`}
            >
              {/* Day Header */}
              <div className="border-b border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {getDayLetter(dayData.date)}
                </div>
                <div className="text-sm text-gray-600">
                  {getFormattedDate(dayData.date)}
                </div>
              </div>

              {/* Meals List */}
              <div className="py-4 px-2 space-y-3">
                {dayData.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="flex gap-1 flex-wrap text-xs">
                    <span className="font-semibold text-gray-400">
                      {getMealTypeLabel(meal.mealType)}:
                    </span>
                    <span className="text-gray-900">{meal.dish}</span>
                  </div>
                ))}
                
                {/* Show empty state if no meals */}
                {dayData.meals.length === 0 && (
                  <div className="text-sm text-gray-500 italic">
                    No meals recorded
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Meals;