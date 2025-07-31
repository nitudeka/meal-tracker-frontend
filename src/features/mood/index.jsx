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

const MoodPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMoodSaved = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h2>Hi John Doe!</h2>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Add Entry</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Mood Entry</DialogTitle>
          </DialogHeader>
          <AddMood onMoodSaved={handleMoodSaved} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodPage;
