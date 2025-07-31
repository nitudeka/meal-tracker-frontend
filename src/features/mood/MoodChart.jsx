import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const moodLevels = [
  { value: 5, mood: "happy", label: "Happy", emoji: "😊" },
  { value: 4, mood: "content", label: "Content", emoji: "🙂" },
  { value: 3, mood: "neutral", label: "Neutral", emoji: "😐" },
  { value: 2, mood: "stressed", label: "Stressed", emoji: "😰" },
  { value: 1, mood: "sad", label: "Sad", emoji: "😔" },
  { value: 0, mood: "angry", label: "Angry", emoji: "😡" },
];

const entryTypeColors = {
  "daily-checkin": "#10b981", // Green
  "post-meditation": "#f59e0b", // Orange
  "post-workout": "#0ea5e9", // Blue
};

const entryTypeLabels = {
  "daily-checkin": "Daily Check-in",
  "post-meditation": "After Meditation",
  "post-workout": "After Workout",
};

const MoodChart = ({ moodEntries = [] }) => {
  const chartData = useMemo(() => {
    // Generate all days for the current week
    const generateWeekDays = () => {
      const today = new Date();
      const days = [];
      
      // Get the start of the week (7 days ago)
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 6);
      
      // Generate all 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayLetter = dayName.charAt(0); // Get first letter
        
        days.push({
          date: dayKey,
          day: dayLetter,
        });
      }
      
      return days;
    };

    // Get all week days
    const weekDays = generateWeekDays();
    
    if (!moodEntries.length) return weekDays;

    // Group entries by date and entry type
    const groupedData = {};
    
    moodEntries.forEach(entry => {
      const date = new Date(entry.date);
      const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      if (!groupedData[dayKey]) {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayLetter = dayName.charAt(0); // Get first letter
        groupedData[dayKey] = {
          date: dayKey,
          day: dayLetter,
        };
      }
      // Convert mood string to numeric value
      const moodValue = moodLevels.find(level => level.mood.toLowerCase() === entry.mood.toLowerCase())?.value;

      groupedData[dayKey][entry.entryType] = moodValue;
    });

    // Merge week days with mood data
    return weekDays.map(weekDay => ({
      ...weekDay,
      ...groupedData[weekDay.date]
    }));
  }, [moodEntries]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => {
            const moodLevel = moodLevels.find(level => level.value === entry.value);
            return (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entryTypeLabels[entry.dataKey]}: {moodLevel?.emoji} {moodLevel?.label}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const CustomYAxisTick = ({ x, y, payload }) => {
    const moodLevel = moodLevels.find(level => level.value === payload.value);
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={4} textAnchor="end" fill="#666" className="text-xs">
          {moodLevel?.emoji}
        </text>
      </g>
    );
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-col justify-center space-y-2 mt-4 -ml-3">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs whitespace-nowrap text-gray-600">
              {entryTypeLabels[entry.value]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (!moodEntries.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mood Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p>No mood data available yet</p>
            <p className="text-sm">Add some mood entries to see your trends</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="pb-0">
      <CardHeader>
        <CardTitle>Mood Trends</CardTitle>
      </CardHeader>
              <CardContent>
          <div className="h-80 focus:outline-none">
            <ResponsiveContainer width="100%" height="100%" className="outline-none focus:outline-none">
            <LineChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                height={30}
              />
              <YAxis 
                domain={[0, 5]}
                ticks={[0, 1, 2, 3, 4, 5]}
                tick={<CustomYAxisTick />}
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              
              {/* Render lines for each entry type that has data */}
              {Object.keys(entryTypeColors).map(entryType => {
                const hasData = chartData.some(data => data[entryType] !== undefined);
                if (!hasData) return null;
                
                return (
                  <Line
                    key={entryType}
                    type="step"
                    dataKey={entryType}
                    stroke={entryTypeColors[entryType]}
                    strokeWidth={3}
                    dot={{ fill: entryTypeColors[entryType], strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: entryTypeColors[entryType], strokeWidth: 2 }}
                    connectNulls={true}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
          
          {/* Custom right-side mood labels */}
          {/* <div className="absolute top-0 right-0 h-full text-xs text-gray-600 pr-2 pointer-events-none">
            {moodLevels.map((level, index) => {
              // Calculate position to match Y-axis ticks
              const totalHeight = 320; // h-80 = 320px
              const tickSpacing = totalHeight / 5; // 6 ticks, 5 spaces
              const topMargin = 20; // Chart top margin
              const position = topMargin + (5 - level.value) * tickSpacing;
              
              return (
                <div 
                  key={level.value} 
                  className="absolute flex items-center whitespace-nowrap"
                  style={{ 
                    top: `${position}px`,
                    transform: 'translateY(-50%)'
                  }}
                >
                  <span>{level.label}</span>
                </div>
              );
            })}
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodChart; 