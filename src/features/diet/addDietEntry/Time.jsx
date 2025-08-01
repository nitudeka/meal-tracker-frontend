import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DatePicker from "@/components/ui/date-picker";
import { Calendar, Utensils } from "lucide-react";

const DietTime = ({ formData, onComplete, onNext, onPrevious, currentStep, totalSteps }) => {
  const [date, setDate] = useState(formData?.date || new Date());
  const [mealType, setMealType] = useState(formData?.mealType || "");

  const mealTypes = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snack", label: "Others/Snacks" },
  ];

  const handleSubmit = () => {
    onComplete({ date, mealType });
    // TODO: Submit to API
    console.log("Submitting diet entry:", { ...formData, date, mealType });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xs font-semibold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-red-500" />
          When Did This Feast Go Down?
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Pick a date and a time slot — breakfast, lunch, dinner, or just a snack — and we'll log it accordingly. 😅
        </p>
      </div>

      {/* Date Selection */}
      <div>
        <Label className="text-sm font-medium text-gray-700">Date</Label>
        <div className="mt-1">
          <DatePicker date={date} setDate={setDate} />
        </div>
      </div>

      {/* Meal Type Selection */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">Meal Type</Label>
        <div className="space-y-2">
          {mealTypes.map((type) => (
            <label
              key={type.value}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="mealType"
                value={type.value}
                checked={mealType === type.value}
                onChange={(e) => setMealType(e.target.value)}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!mealType}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DietTime;