import { useMemo, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const entryTypes = [
    {
        id: "daily-checkin",
        label: "Daily Check-in",
        question: "How are you feeling today?"
    },
    {
        id: "post-workout",
        label: "Post Workout",
        question: "How are you feeling after workout?"
    },
    {
        id: "post-meditation",
        label: "Post Meditation",
        question: "How are you feeling after meditation?"
    }
]

const moodOptions = [
    {
        id: "happy",
        label: "Happy",
        icon: "😊"
    },
    { 
        id: "content",
        label: "Content",
        icon: "🙂"
    },
    {
        id: "neutral",
        label: "Neutral",
        icon: "😐"
    },
    {
        id: "stressed",
        label: "Stressed",
        icon: "😰"
    },
    {
        id: "sad",
        label: "Sad",
        icon: "😔"
    },
    {
        id: "angry",
        label: "Angry",
        icon: "😡"
    },
    
]

const AddMood = () => {
    const [entryType, setEntryType] = useState()

    const selectedEntryTypeQuestion = useMemo(() => {
        if (!entryType) return ""
        
        return entryTypes.find(entry => entry.id === entryType)?.question || ""
    }, [entryType])
    
  return <div>
    <Select value={entryType} onValueChange={setEntryType}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Entry Type" />
  </SelectTrigger>
  <SelectContent>
    {entryTypes.map((entryType) => (
        <SelectItem key={entryType.id} value={entryType.id}>{entryType.label}</SelectItem>
    ))}
  </SelectContent>
</Select>
<div className="mt-4">
    <h3 className="text-xs font-medium mb-4">{selectedEntryTypeQuestion}</h3>
    <div className="grid grid-cols-3 grid-rows-2 gap-4 mb-4">
        {moodOptions.map((mood) => (
            <div key={mood.id} className="flex flex-col items-center justify-center">
                <span className="text-2xl">{mood.icon}</span>
                <span className="text-sm">{mood.label}</span>
            </div>
        ))}
    </div>
</div>
<Button className="w-full">Add Entry</Button>
  </div>;
};

export default AddMood;