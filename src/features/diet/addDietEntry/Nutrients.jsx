import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Nutrients = ({ formData, onComplete, onNext, onPrevious, currentStep, totalSteps }) => {
  const [nutrients, setNutrients] = useState(formData.nutrients || {
    calories: 100,
    protein: 100,
    fats: 100,
    fibre: 100,
    sugar: 100,
  });

  const nutrientFields = [
    { key: "calories", label: "Calories", unit: "kcal" },
    { key: "protein", label: "Protein", unit: "g" },
    { key: "fats", label: "Fats", unit: "g" },
    { key: "fibre", label: "Fibre", unit: "g" },
    { key: "sugar", label: "Sugar", unit: "g" },
  ];

  const handleNutrientChange = (key, value) => {
    setNutrients(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const handleNext = () => {
    onComplete({ nutrients });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Crunch the Numbers</h3>
        <p className="text-sm text-gray-600 mt-1">
          Here's your nutrition breakdown. All looks good? Hit Confirm to log this delicious crime.
        </p>
      </div>

      {/* Nutrition Fields */}
      <div className="space-y-4">
        {nutrientFields.map((field) => (
          <div key={field.key} className="grid grid-cols-3 p-3 border border-gray-200 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 flex-1">
              {field.label}
            </Label>
            <div className="flex items-center mr-2">
              <Input
                type="number"
                value={nutrients[field.key]}
                onChange={(e) => handleNutrientChange(field.key, e.target.value)}
                className="w-20 text-right"
              />
            </div>
            <div className="text-sm flex items-center pl-6 text-gray-600">{field.unit}</div>
          </div>
        ))}
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
          onClick={handleNext}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Nutrients;