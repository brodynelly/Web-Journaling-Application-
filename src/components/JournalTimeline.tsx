import React from 'react';
import { Calendar, Image, Mic, PenLine, MapPin, Music } from 'lucide-react';
import { Entry } from '../types';
import { formatDate } from '../utils/dateUtils';

interface JournalTimelineProps {
  entries: Entry[];
  onSelectEntry: (entry: Entry) => void;
}

const JournalTimeline: React.FC<JournalTimelineProps> = ({ entries, onSelectEntry }) => {
  // Group entries by date
  const groupedEntries: { [key: string]: Entry[] } = {};
  
  entries.forEach(entry => {
    const dateKey = formatDate(entry.date, 'YYYY-MM-DD');
    if (!groupedEntries[dateKey]) {
      groupedEntries[dateKey] = [];
    }
    groupedEntries[dateKey].push(entry);
  });

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedEntries).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="bg-blue-50 p-4 rounded-full mb-4">
          <PenLine size={32} className="text-blue-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Your journal is empty</h2>
        <p className="text-gray-600 mb-6 max-w-xs">
          Start capturing your thoughts, memories, and moments by creating your first entry.
        </p>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-full font-medium hover:bg-blue-600 transition-colors">
          Create Entry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      {sortedDates.map(dateKey => (
        <div key={dateKey} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 sticky top-16 bg-gray-50 py-2 z-10">
            {formatDate(new Date(dateKey), 'dddd, MMMM D, YYYY')}
          </h2>
          
          <div className="space-y-4">
            {groupedEntries[dateKey].map(entry => (
              <div 
                key={entry.id}
                onClick={() => onSelectEntry(entry)}
                className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              >
                {/* Main content */}
                <div className="p-4 pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{entry.title}</h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(entry.date, 'h:mm A')}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-sm line-clamp-2 mb-2">
                    {entry.content}
                  </p>
                </div>
                
                {/* Images Gallery */}
                {entry.images && entry.images.length > 0 && (
                  <div className="px-4 pb-3">
                    <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
                      {entry.images.slice(0, 1).map((image, idx) => (
                        <div key={idx} className="aspect-square">
                          <img 
                            src={image} 
                            alt={entry.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {entry.images.slice(1, 2).map((image, idx) => (
                        <div key={idx} className="aspect-square">
                          <img 
                            src={image} 
                            alt={entry.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Activity & Location Info */}
                <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                  {entry.location && (
                    <div className="bg-gray-50 rounded-lg p-2 flex items-center">
                      <MapPin size={16} className="text-gray-500 mr-2" />
                      <span className="text-xs text-gray-700 truncate">{entry.location}</span>
                    </div>
                  )}
                  
                  {entry.activity && (
                    <div className="bg-gray-50 rounded-lg p-2 flex items-center">
                      <span className="mr-2">{entry.activity.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-700 capitalize">{entry.activity.type}</span>
                        {entry.activity.steps && (
                          <span className="text-xs text-gray-500">{entry.activity.steps} steps</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {entry.music && (
                    <div className="bg-gray-50 rounded-lg p-2 flex items-center">
                      <Music size={16} className="text-gray-500 mr-2" />
                      <span className="text-xs text-gray-700 truncate">{entry.music.track}</span>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 rounded-lg p-2 flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${getMoodColor(entry.mood)}`}></div>
                    <span className="text-xs text-gray-700 capitalize">{entry.mood}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to get mood color
function getMoodColor(mood: string): string {
  switch (mood.toLowerCase()) {
    case 'happy':
      return 'bg-yellow-400';
    case 'peaceful':
      return 'bg-blue-400';
    case 'thoughtful':
      return 'bg-purple-400';
    case 'sad':
      return 'bg-gray-400';
    case 'anxious':
      return 'bg-orange-400';
    default:
      return 'bg-gray-400';
  }
}

export default JournalTimeline;