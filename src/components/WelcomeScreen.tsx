import React from 'react';
import { PenLine, Lock, Calendar } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 flex flex-col">
      {/* Status Bar */}
      <div className="h-10 flex items-center justify-between px-4 text-white text-xs">
        <div>9:41</div>
        <div className="flex items-center space-x-1">
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
        </div>
      </div>
      
      {/* Floating Cards Animation */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Animated floating cards */}
          <div className="relative w-full max-w-sm h-64">
            <div className="absolute top-0 left-10 w-40 h-32 bg-white rounded-lg shadow-lg transform -rotate-12 animate-float-slow">
              <div className="h-20 bg-blue-400 rounded-t-lg"></div>
              <div className="p-2">
                <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            
            <div className="absolute top-10 right-10 w-36 h-28 bg-white rounded-lg shadow-lg transform rotate-6 animate-float">
              <div className="h-16 bg-green-400 rounded-t-lg"></div>
              <div className="p-2">
                <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-20 w-32 h-24 bg-white rounded-lg shadow-lg transform rotate-12 animate-float-fast">
              <div className="h-14 bg-yellow-400 rounded-t-lg"></div>
              <div className="p-2">
                <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Welcome Card */}
      <div className="bg-white rounded-t-3xl px-6 pt-8 pb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Welcome to Journal</h1>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-4">
              <PenLine size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Write about your day and add photos, places, and more.</h3>
              <p className="text-gray-600 text-sm">Capture your thoughts, memories, and experiences.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-purple-100 p-2 rounded-full mr-4">
              <Lock size={24} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Lock your journal to keep it private.</h3>
              <p className="text-gray-600 text-sm">Your entries are end-to-end encrypted and only accessible by you.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-full mr-4">
              <Calendar size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Schedule time for writing and make it a habit.</h3>
              <p className="text-gray-600 text-sm">Set reminders to journal regularly and build a meaningful practice.</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onComplete}
          className="w-full bg-indigo-600 text-white py-3.5 rounded-full font-medium text-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;