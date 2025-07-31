import { useMemo, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import DatePicker from "@/components/ui/date-picker"
import { cn } from "@/lib/utils"

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
    const [entryType, setEntryType] = useState("daily-checkin")
    const [date, setDate] = useState(new Date())
    const [mood, setMood] = useState()

    const selectedEntryTypeQuestion = useMemo(() => {
        if (!entryType) return ""
        
        return entryTypes.find(entry => entry.id === entryType)?.question || ""
    }, [entryType])
    
  return <div>
    <div className="mb-4">
        <Label className="text-xs font-medium mb-2">Date</Label>
        <DatePicker date={date} setDate={setDate} />
    </div>
    <Label className="text-xs font-medium mb-2">Entry Type</Label>
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
    <Label className="text-xs font-medium mb-2">{selectedEntryTypeQuestion}</Label>
    <div className="grid grid-cols-3 grid-rows-2 gap-4 mb-4">
        {moodOptions.map((m) => (
            <div key={m.id} className={cn("flex border cursor-pointer hover:bg-muted rounded-md py-1.5 flex-col items-center justify-center", mood === m.id && "bg-gray-200")} onClick={() => setMood(m.id)}>
                <span className="text-2xl">{m.icon}</span>
                <span className="text-sm">{m.label}</span>
            </div>
        ))}
    </div>
</div>
<Button className="w-full">Add Entry</Button>
  </div>;
};

export default AddMood;