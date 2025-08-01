import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { dietKeys, useSaveDietEntry } from "@/hooks";
import Dish from "./addDietEntry/Dish";
import Nutrients from "./addDietEntry/Nutrients";
import DietTime from "./addDietEntry/Time";

const DietPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    dish: "",
    ingredients: [],
    nutrients: {
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
      fibre: 0,
      sugar: 0,
    },
    date: new Date(),
    mealType: "",
  });

  const { mutate: saveDietEntry, isPending: isSaving } = useSaveDietEntry();
  const queryClient = useQueryClient();

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
    const newFormData = { ...formData, ...stepData };
    setFormData(newFormData);

    // Only submit to API on the final step (step 3)
    if (currentStep === 3) {
      handleSubmit(newFormData);
    }
  };

  const handleSubmit = (formData) => {
    // Format the data for the API
    const apiData = {
      dish: formData.dish,
      ingredients: formData.ingredients,
      nutrients: formData.nutrients,
      date: formData.date.toISOString(), // Format as YYYY-MM-DD
      mealType: formData.mealType
    };

    saveDietEntry(apiData, {
      onSuccess: (data) => {
        toast.success("Diet entry saved successfully!");
        queryClient.invalidateQueries({ queryKey: dietKeys.all });
        navigate("/diet");
      },
      onError: (error) => {
        console.error("Failed to save diet entry:", error);
        toast.error(error.message || "Failed to save diet entry");
      }
    });
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
            isSaving={isSaving}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DietPage;
