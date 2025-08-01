import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Dish from "./addDietEntry/Dish";
import Nutrients from "./addDietEntry/Nutrients";
import DietTime from "./addDietEntry/Time";

const DietPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    dish: "",
    ingredients: [],
    nutrients: {
      calories: 0,
      protein: 0,
      fats: 0,
      fibre: 0,
      sugar: 0,
    },
    date: new Date(),
    mealType: "",
  });

  const steps = [
    { id: 1, title: "Ingredients", component: Dish },
    { id: 2, title: "Nutrition", component: Nutrients },
    { id: 3, title: "Time", component: DietTime },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepComplete = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const handleSubmit = () => {
    console.log("Final form data:", formData);
    // TODO: Submit to API
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="p-6 h-full overflow-y-auto hide-scrollbar">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Add Diet Entry</h2>
        <p className="text-gray-600 mt-1">Track your nutrition and meals</p>
      </div>

      {/* Step Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[0.6rem] font-medium ${
                  currentStep >= step.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`ml-2 text-xs font-medium ${
                  currentStep >= step.id ? "text-green-600" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-2 h-0.5 mx-2 ${
                    currentStep > step.id ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="py-0">
        <CardContent className="p-6">
          <CurrentStepComponent
            formData={formData}
            onComplete={handleStepComplete}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DietPage;
