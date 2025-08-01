import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { useMoodEntries } from "@/hooks/useMood";

const moodIcons = {
  happy: "😊",
  content: "🙂",
  neutral: "😐",
  stressed: "😰",
  sad: "😔",
  angry: "😡",
};

const entryTypeLabels = {
  "daily-checkin": "Daily Check-in",
  "post-workout": "Post Workout",
  "post-meditation": "Post Meditation",
};

const MoodHistory = ({ onAddEntry }) => {
  const {
    data: moodEntriesData = {},
    isLoading,
    error,
    refetch,
  } = useMoodEntries();
  const moodEntries = moodEntriesData?.data || [];

  const formatDate = (dateString) => {
    return dayjs(dateString).format("DD MMM YYYY, hh:mm A");
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Your Mood History
        </h3>
      </div>

      {isLoading && (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading your mood entries...</p>
        </div>
      )}

      {error && (
        <div className="p-6 text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">
              {error.message || "Failed to fetch mood entries"}
            </p>
            <Button variant="outline" className="mt-2" onClick={handleRefresh}>
              Try Again
            </Button>
          </div>
        </div>
      )}

      {!isLoading && !error && moodEntries.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">😊</div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            No mood entries yet
          </h4>
          <p className="text-gray-500 mb-4">
            Start tracking your mood by adding your first entry
          </p>
          <Button onClick={onAddEntry}>Add Your First Entry</Button>
        </div>
      )}

      {!isLoading && !error && moodEntries.length > 0 && (
        <div className="divide-y divide-gray-200">
          {moodEntries.map((entry, index) => (
            <div
              key={entry.id || index}
              className="px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">
                    {moodIcons[entry.mood] || "😐"}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm text-gray-900 capitalize">
                        {entry.mood}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {entryTypeLabels[entry.entryType] || entry.entryType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(entry.date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodHistory;
