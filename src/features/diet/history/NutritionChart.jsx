import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, startOfWeek, addDays } from "date-fns";
import { useWeeklyNutrition } from "@/hooks";

const NutritionChart = () => {
  const [activeTab, setActiveTab] = useState("carbs");

  // Fetch weekly nutrition data from API
  const { data: apiData, isLoading, error } = useWeeklyNutrition();

  // Use API data or fallback to empty array
  const chartData = apiData?.data || [];

  const tabs = [
    { id: "protein", label: "Protein" },
    { id: "carbs", label: "Carbs" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}g
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getChartData = () => {
    const dataKey = activeTab === "protein" ? "protein" : "carbs";
    const goalKey = activeTab === "protein" ? "proteinGoal" : "carbsGoal";
    const color = activeTab === "protein" ? "#10B981" : "#F59E0B";
    const name = activeTab === "protein" ? "Protein" : "Carbs";
    
    return {
      dataKey,
      goalKey,
      color,
      name,
      domain: activeTab === "protein" ? [2.5, 6] : [0, 3.5],
      ticks: activeTab === "protein" ? [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6] : [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5]
    };
  };

  const CustomXAxisTick = ({ x, y, payload }) => {
    const dayData = chartData.find(item => item.day === payload.value);
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={8} textAnchor="middle" fill="#6B7280" className="text-xs font-medium">
          {payload.value}
        </text>
        {dayData && (
          <>
            <text x={0} y={0} dy={20} textAnchor="middle" fill="#9CA3AF" className="text-xs">
              {dayData.date}
            </text>
            <text x={0} y={0} dy={32} textAnchor="middle" fill="#9CA3AF" className="text-[0.6rem]">
              {dayData.month}
            </text>
          </>
        )}
        
      </g>
    );
  };

  const CustomYAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={-10} y={0} dy={4} textAnchor="end" fill="#6B7280" className="text-xs">
          {payload.value}g
        </text>
      </g>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Nutrition Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex space-x-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-64">
          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <div className="text-gray-500">Loading nutrition data...</div>
            </div>
          )}
          
          {error && (
            <div className="flex justify-center items-center h-full">
              <div className="text-red-500">Failed to load nutrition data</div>
            </div>
          )}
          
          {!isLoading && !error && chartData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="day"
                tick={<CustomXAxisTick />}
                axisLine={false}
                tickLine={false}
                height={60}
              />
              <YAxis
                tick={<CustomYAxisTick />}
                axisLine={false}
                tickLine={false}
                domain={getChartData().domain}
                ticks={getChartData().ticks}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Goal Line */}
              <CartesianGrid
                stroke="#000000"
                strokeWidth={2}
                strokeDasharray="0"
                horizontal={true}
                vertical={false}
                y={activeTab === "protein" ? 5 : 3}
              />
              
              {/* Single Bar for selected nutrition type */}
              <Bar
                dataKey={getChartData().dataKey}
                fill={getChartData().color}
                radius={[4, 4, 0, 0]}
                name={getChartData().name}
              />
                          </BarChart>
            </ResponsiveContainer>
          )}
        </div>


      </CardContent>
    </Card>
  );
};

export default NutritionChart; 