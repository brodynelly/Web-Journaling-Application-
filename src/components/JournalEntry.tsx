import React, { useState } from 'react';
import { Calendar, Heart, Image, Mic, PenLine, Tag, MapPin, Music, Share, MoreHorizontal } from 'lucide-react';
import { Entry } from '../types';
import { formatDate } from '../utils/dateUtils';

interface JournalEntryProps {
  entry: Entry;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entry }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Entry Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-semibold text-gray-900">{entry.title}</h1>
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 p-1 hover:bg-gray-100 rounded-full">
                <Share size={18} />
              </button>
              <button className="text-gray-500 p-1 hover:bg-gray-100 rounded-full">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(entry.date, 'dddd, MMMM D, YYYY • h:mm A')}</span>
          </div>
        </div>
        
        {/* Images Gallery */}
        {entry.images && entry.images.length > 0 && (
          <div className="border-b border-gray-100">
            {entry.images.length === 1 ? (
              <div className="aspect-video w-full">
                <img 
                  src={entry.images[0]} 
                  alt={entry.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-0.5">
                {entry.images.map((image, index) => (
                  <div key={index} className="aspect-square">
                    <img 
                      src={image} 
                      alt={`Entry image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Location & Activity */}
        {(entry.location || entry.activity || entry.music) && (
          <div className="p-4 border-b border-gray-100 grid grid-cols-2 gap-2">
            {entry.location && (
              <div className="bg-gray-50 rounded-lg p-3 flex items-center">
                <MapPin size={18} className="text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">{entry.location}</span>
              </div>
            )}
            
            {entry.activity && (
              <div className="bg-gray-50 rounded-lg p-3 flex items-center">
                <span className="text-xl mr-2">{entry.activity.icon}</span>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700 capitalize">{entry.activity.type}</span>
                  {entry.activity.steps && (
                    <span className="text-xs text-gray-500">{entry.activity.steps} steps</span>
                  )}
                  {entry.activity.duration && (
                    <span className="text-xs text-gray-500">{Math.floor(entry.activity.duration / 60)} min</span>
                  )}
                </div>
              </div>
            )}
            
            {entry.music && (
              <div className="bg-gray-50 rounded-lg p-3 flex items-center">
                <Music size={18} className="text-gray-500 mr-2" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700">{entry.music.track}</span>
                  <span className="text-xs text-gray-500">{entry.music.artist}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Entry Content */}
        <div className="p-4">
          {isEditing ? (
            <textarea
              defaultValue={entry.content}
              className="w-full min-h-[200px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div className="prose max-w-none">
              <p className="text-gray-800 leading-relaxed">{entry.content}</p>
            </div>
          )}
        </div>
        
        {/* Audio Player (if available) */}
        {entry.audioUrl && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center">
              <Mic size={18} className="text-gray-500 mr-2" />
              <div className="text-sm font-medium text-gray-700">Voice Note</div>
            </div>
            <audio controls className="w-full mt-2 rounded-lg">
              <source src={entry.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        
        {/* Handwriting Canvas (if available) */}
        {entry.handwritingData && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center mb-2">
              <PenLine size={18} className="text-gray-500 mr-2" />
              <div className="text-sm font-medium text-gray-700">Handwritten Note</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 min-h-[150px]">
              <img 
                src={entry.handwritingData} 
                alt="Handwritten note" 
                className="max-w-full"
              />
            </div>
          </div>
        )}
        
        {/* Mood and Tags */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Heart size={18} className="text-gray-500 mr-2" />
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-1 ${getMoodColor(entry.mood)}`}></div>
                <span className="text-sm font-medium text-gray-700 capitalize">{entry.mood}</span>
              </div>
            </div>
            
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex items-center">
                <Tag size={18} className="text-gray-500 mr-2" />
                <div className="flex flex-wrap gap-1">
                  {entry.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Edit Button */}
        <div className="p-4 border-t border-gray-100 flex justify-center">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white py-2 px-6 rounded-full font-medium hover:bg-blue-600 transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Edit Entry'}
          </button>
        </div>
      </div>
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

export default JournalEntry;