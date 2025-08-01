import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserProfile, useMoodEntries } from "@/hooks";
import AddMood from "./AddMood";
import MoodHistory from "./MoodHistory";
import MoodChart from "./MoodChart";

const MoodPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: userProfile, isLoading: isProfileLoading } = useUserProfile();
  const { data: moodEntriesData = {} } = useMoodEntries();
  const moodEntries = moodEntriesData?.data || [];

  const handleMoodSaved = () => {
    setIsDialogOpen(false);
  };

  const handleAddEntry = () => {
    setIsDialogOpen(true);
  };

  // Get user name from profile data
  const getUserName = () => {
    if (isProfileLoading) return "Loading...";
    if (!userProfile?.data) return "User";

    // Try different possible name fields from the API response
    const profile = userProfile.data;
    return (
      profile.name ||
      profile.firstName ||
      profile.fullName ||
      profile.username ||
      "User"
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-full overflow-y-auto hide-scrollbar">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-600">
            hi,{" "}
            <span className="text-3xl text-gray-900">
              {getUserName().split(" ")[0]}!
            </span>
          </h2>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>+ Add Entry</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Mood Entry</DialogTitle>
            </DialogHeader>
            <AddMood onMoodSaved={handleMoodSaved} />
          </DialogContent>
        </Dialog>
      </div>
      <p className="text-gray-600 mt-1 mb-4">
        Track your daily mood and wellness journey
      </p>

      {/* Mood Chart Component */}
      <div className="mb-6">
        <MoodChart moodEntries={moodEntries} />
      </div>

      {/* Mood History Component */}
      <MoodHistory onAddEntry={handleAddEntry} />
    </div>
  );
};

export default MoodPage;
