import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddMood from "./AddMood";
import MoodHistory from "./MoodHistory";

const MoodPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMoodSaved = () => {
    setIsDialogOpen(false);
  };

  const handleAddEntry = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-full overflow-y-auto hide-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Hi John Doe!</h2>
          <p className="text-gray-600 mt-1">Track your daily mood and wellness journey</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              + Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Mood Entry</DialogTitle>
            </DialogHeader>
            <AddMood onMoodSaved={handleMoodSaved} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Mood History Component */}
      <MoodHistory 
        onAddEntry={handleAddEntry}
      />
    </div>
  );
};

export default MoodPage;
