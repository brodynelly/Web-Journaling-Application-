import React from 'react';
import { X, Calendar, BarChart, Settings, Lock, User, Download, Moon, Sun, BookOpen, Tag, Bell } from 'lucide-react';
import MoodInsights from './MoodInsights';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Mock mood data for insights
  const mockMoodData = [
    { date: new Date(2025, 3, 10), mood: 'happy', value: 5 },
    { date: new Date(2025, 3, 11), mood: 'peaceful', value: 4 },
    { date: new Date(2025, 3, 12), mood: 'thoughtful', value: 3 },
    { date: new Date(2025, 3, 13), mood: 'thoughtful', value: 3 },
    { date: new Date(2025, 3, 14), mood: 'peaceful', value: 4 },
    { date: new Date(2025, 3, 15), mood: 'happy', value: 5 },
  ];
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div className="relative flex flex-col w-80 max-w-[80vw] h-full bg-white shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Journal</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3">
              <User size={20} />
            </div>
            <div>
              <div className="font-medium text-gray-900">John Appleseed</div>
              <div className="text-sm text-gray-500">john@example.com</div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-blue-500 bg-blue-50 rounded-lg">
                <Calendar size={20} className="mr-3" />
                <span>Timeline</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                <BookOpen size={20} className="mr-3 text-gray-500" />
                <span>All Entries</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                <BarChart size={20} className="mr-3 text-gray-500" />
                <span>Insights</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                <Tag size={20} className="mr-3 text-gray-500" />
                <span>Tags</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                <Bell size={20} className="mr-3 text-gray-500" />
                <span>Reminders</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                <Settings size={20} className="mr-3 text-gray-500" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Mood Insights Preview */}
        <div className="p-4">
          <MoodInsights moodData={mockMoodData} />
        </div>
        
        {/* Theme Toggle */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Moon size={18} className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Dark Mode</span>
            </div>
            <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200">
              <span className="absolute h-4 w-4 left-1 bg-white rounded-full transition-transform"></span>
            </button>
          </div>
        </div>
        
        {/* Security Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Lock size={14} className="mr-1" />
            <span>End-to-end encrypted</span>
          </div>
          <p className="text-xs text-gray-500">
            Your journal entries are securely encrypted and only accessible by you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;