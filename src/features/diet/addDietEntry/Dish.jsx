import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { useIngredients, useNutrients } from "@/hooks";

const Dish = ({ formData, onComplete, onNext }) => {
  const [dish, setDish] = useState(formData.dish || "");
  const [ingredients, setIngredients] = useState(formData.ingredients || []);
  const [showIngredients, setShowIngredients] = useState(false);

  const {
    mutate: fetchIngredients,
    data: ingredientsData,
    isPending,
    error,
    ...rest
  } = useIngredients()

  const {
    mutate: fetchNutrients,
    isPending: isLoadingNutrients,
  } = useNutrients();

  const handleFetchIngredients = () => {
    if (!dish.trim()) {
      return;
    }

    fetchIngredients(dish);
  };

  // Parse quantity string to separate amount and unit
  const parseQuantity = (quantityStr) => {
    if (!quantityStr) return null;

    // Extract number and unit from strings like "500g", "30g", "5g"
    const match = quantityStr.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (match) {
      return {
        quantity: parseFloat(match[1]),
        unit: match[2] || "g",
      };
    }

    // Skip if no numeric quantity found
    return null;
  };

  // Handle API response
  useEffect(() => {
    if (ingredientsData?.ingredients) {
      // Parse the API response to match our component's expected format
      const parsedIngredients = ingredientsData.ingredients
        .map((ingredient) => {
          const parsed = parseQuantity(ingredient.quantity);
          if (parsed) {
            return {
              name: ingredient.name,
              quantity: parsed.quantity,
              unit: parsed.unit,
            };
          }
          return null;
        })
        .filter((ingredient) => ingredient !== null); // Remove null ingredients
      setIngredients(parsedIngredients);
      setShowIngredients(true);
    } else if (error) {
      // Fallback to default ingredients for demo
      setIngredients([
        { name: "Chicken", quantity: 100, unit: "g" },
        { name: "Cream", quantity: 10, unit: "g" },
        { name: "Onion", quantity: 8, unit: "g" },
        { name: "Tomato Puree", quantity: 8, unit: "g" },
      ]);
      setShowIngredients(true);
    }
  }, [ingredientsData, error]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "g" }]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredients(updatedIngredients);
  };

  const handleNext = () => {
    // Format ingredients for the API
    const formattedIngredients = ingredients.map(ingredient => ({
      name: ingredient.name,
      quantity: `${ingredient.quantity}${ingredient.unit}`
    }));

    // Call nutrients API
    fetchNutrients(formattedIngredients, {
      onSuccess: (data) => {
        // Pass nutrients data along with dish and ingredients
        onComplete({ 
          dish, 
          ingredients,
          nutrients: data
        });
        onNext();
      },
      onError: (error) => {
        console.error("Failed to fetch nutrients:", error);
        // Still proceed to next step even if nutrients fail
        onComplete({ dish, ingredients });
        onNext();
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Mix It Up</h3>
        <p className="text-sm text-gray-600 mt-1">
          Here's the usual recipe lineup. Tweak anything you like, then hit
          Confirm to cook things up.
        </p>
      </div>

      {/* Dish Selection */}
      <div>
        <Label className="text-sm font-medium text-gray-700">Dish</Label>
        <Input
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          placeholder="Enter dish name"
          className="mt-1"
        />
      </div>

      {/* Get Ingredients Button */}
      <Button
        onClick={handleFetchIngredients}
        loading={isPending}
        disabled={!dish.trim()}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        {isPending ? "Loading..." : "Get Ingredients"}
      </Button>

      {/* Ingredients Section */}
      {showIngredients && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-sm font-medium text-gray-700">
              Quantity
            </Label>
          </div>

          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex-1 mr-2">
                  <Input
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                    placeholder="Ingredient name"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "quantity",
                        parseFloat(e.target.value),
                      )
                    }
                    className="w-12"
                  />
                  <span className="text-sm text-gray-600 w-4">
                    {ingredient.unit}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-500 -mr-2 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add Ingredient Button */}
          <Button
            variant="outline"
            onClick={handleAddIngredient}
            className="mt-4 w-full border-gray-200 text-green-700 hover:bg-green-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Ingredient
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!dish || ingredients.length === 0}
          loading={isLoadingNutrients}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoadingNutrients ? "Loading..." : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Dish;
