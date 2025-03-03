import React from 'react';
import { BarChart2, Calendar, TrendingUp, Heart } from 'lucide-react';
import { MoodData } from '../types';

interface MoodInsightsProps {
  moodData: MoodData[];
}

const MoodInsights: React.FC<MoodInsightsProps> = ({ moodData }) => {
  // Calculate average mood
  const averageMood = moodData.reduce((sum, data) => sum + data.value, 0) / moodData.length;
  
  // Find most common mood
  const moodCounts: Record<string, number> = {};
  moodData.forEach(data => {
    moodCounts[data.mood] = (moodCounts[data.mood] || 0) + 1;
  });
  
  let mostCommonMood = '';
  let highestCount = 0;
  
  Object.entries(moodCounts).forEach(([mood, count]) => {
    if (count > highestCount) {
      mostCommonMood = mood;
      highestCount = count;
    }
  });
  
  // Generate mock insights
  const insights = [
    "You tend to feel more positive on weekends.",
    "Your mood improves after writing about gratitude.",
    "Entries about work often correlate with stress.",
    "You've had more positive days than negative this month."
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Mood Insights</h2>
        <p className="text-sm text-gray-500">Based on your journal entries</p>
      </div>
      
      <div className="p-4">
        {/* Mood Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center text-sm text-blue-700 mb-1">
              <Heart size={16} className="mr-1" />
              <span>Average Mood</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {averageMood.toFixed(1)}/5
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center text-sm text-purple-700 mb-1">
              <TrendingUp size={16} className="mr-1" />
              <span>Most Common</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900 capitalize">
              {mostCommonMood}
            </div>
          </div>
        </div>
        
        {/* Mood Chart (Simplified) */}
        <div className="mb-6">
          <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <BarChart2 size={16} className="mr-1" />
            <span>Mood Trends</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 h-40 flex items-end justify-between">
            {[...Array(7)].map((_, index) => {
              const height = 20 + Math.random() * 80;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-blue-400 rounded-t-sm" 
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* AI Insights */}
        <div>
          <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} className="mr-1" />
            <span>Patterns & Insights</span>
          </div>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoodInsights;