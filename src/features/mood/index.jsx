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
  return (
    <div>
      <h2>Hi John Doe!</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Entry</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Mood Entry</DialogTitle>
          </DialogHeader>
          <AddMood />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodPage;
