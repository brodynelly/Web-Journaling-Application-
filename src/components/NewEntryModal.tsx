import React, { useState, useRef } from 'react';
import { X, Image, Mic, PenLine, Smile, Calendar, MapPin, Tag as TagIcon } from 'lucide-react';
import { Entry } from '../types';
import { getRandomPrompt } from '../utils/promptUtils';
import HandwritingCanvas from './HandwritingCanvas';

interface NewEntryModalProps {
  onClose: () => void;
  onSave: (entry: Entry) => void;
  entryId: string;
}

const NewEntryModal: React.FC<NewEntryModalProps> = ({ onClose, onSave, entryId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutral');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showPrompt, setShowPrompt] = useState(true);
  const [currentPrompt, setCurrentPrompt] = useState(getRandomPrompt());
  const [activeTab, setActiveTab] = useState<'text' | 'handwriting' | 'voice'>('text');
  const [handwritingData, setHandwritingData] = useState<string>('');
  const [location, setLocation] = useState('');
  
  const contentRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title for your entry');
      return;
    }
    
    const newEntry: Entry = {
      id: entryId,
      title: title.trim(),
      content: content.trim(),
      date: new Date(),
      mood,
      images,
      tags,
      location,
      handwritingData: handwritingData || undefined
    };
    
    onSave(newEntry);
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleUsePrompt = () => {
    setContent(prev => {
      const newContent = prev ? `${prev}\n\n${currentPrompt.text}` : currentPrompt.text;
      return newContent;
    });
    setShowPrompt(false);
    
    // Focus the textarea and place cursor at the end
    if (contentRef.current) {
      contentRef.current.focus();
      contentRef.current.selectionStart = contentRef.current.value.length;
      contentRef.current.selectionEnd = contentRef.current.value.length;
    }
  };
  
  const handleNewPrompt = () => {
    setCurrentPrompt(getRandomPrompt());
  };
  
  // Mock function for image upload
  const handleImageUpload = () => {
    // In a real app, this would open a file picker
    // For demo purposes, we'll add a sample image
    setImages([...images, 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000']);
  };

  const handleHandwritingSave = (dataUrl: string) => {
    setHandwritingData(dataUrl);
  };
  
  // Helper function to get mood color
  const getMoodColor = (mood: string): string => {
    switch (mood.toLowerCase()) {
      case 'happy':
        return 'bg-yellow-400';
      case 'peaceful':
        return 'bg-blue-400';
      case 'thoughtful':
        return 'bg-purple-400';
      case 'neutral':
        return 'bg-gray-400';
      case 'sad':
        return 'bg-blue-300';
      case 'anxious':
        return 'bg-orange-400';
      default:
        return 'bg-gray-400';
    }
  };

  // Helper function to get mood emoji
  const getMoodEmoji = (mood: string): string => {
    switch (mood.toLowerCase()) {
      case 'happy':
        return '😊';
      case 'peaceful':
        return '😌';
      case 'thoughtful':
        return '🤔';
      case 'neutral':
        return '😐';
      case 'sad':
        return '😔';
      case 'anxious':
        return '😰';
      default:
        return '😐';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <h2 className="text-lg font-semibold text-gray-900">New Entry</h2>
          <button 
            onClick={handleSave}
            className="text-blue-500 font-medium hover:text-blue-600"
          >
            Save
          </button>
        </div>
        
        {/* Entry Form */}
        <div className="flex-1 overflow-y-auto">
          {/* Writing Prompt */}
          {showPrompt && (
            <div className="bg-blue-50 rounded-lg p-4 m-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-900">Today's Prompt</h3>
                <button 
                  onClick={() => setShowPrompt(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-gray-700 mb-3">{currentPrompt.text}</p>
              <div className="flex space-x-2">
                <button 
                  onClick={handleUsePrompt}
                  className="text-sm text-blue-500 font-medium hover:text-blue-600"
                >
                  Use This Prompt
                </button>
                <button 
                  onClick={handleNewPrompt}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Try Another
                </button>
              </div>
            </div>
          )}
          
          {/* Title Input */}
          <div className="px-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-medium text-gray-900 mb-4 p-2 border-b border-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          {/* Date Display */}
          <div className="flex items-center text-sm text-gray-500 mb-4 px-4">
            <Calendar size={14} className="mr-1" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
          
          {/* Location Input */}
          <div className="px-4 mb-4">
            <div className="flex items-center border-b border-gray-200 py-2">
              <MapPin size={16} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Add location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 text-sm text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          
          {/* Content Tabs */}
          <div className="px-4 mb-4">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('text')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'text' 
                    ? 'text-blue-500 border-b-2 border-blue-500' 
                    : 'text-gray-500'
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setActiveTab('handwriting')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'handwriting' 
                    ? 'text-blue-500 border-b-2 border-blue-500' 
                    : 'text-gray-500'
                }`}
              >
                Handwriting
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'voice' 
                    ? 'text-blue-500 border-b-2 border-blue-500' 
                    : 'text-gray-500'
                }`}
              >
                Voice
              </button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="px-4">
            {activeTab === 'text' && (
              <textarea
                ref={contentRef}
                placeholder="What's on your mind today?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[200px] p-2 text-gray-700 border-0 focus:outline-none resize-none"
              />
            )}
            
            {activeTab === 'handwriting' && (
              <div className="border border-gray-200 rounded-lg h-[300px]">
                <HandwritingCanvas 
                  onSave={handleHandwritingSave}
                  initialData={handwritingData}
                />
              </div>
            )}
            
            {activeTab === 'voice' && (
              <div className="flex flex-col items-center justify-center h-[200px] bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Mic size={24} className="text-blue-500" />
                </div>
                <p className="text-gray-700 mb-2">Tap to start recording</p>
                <p className="text-sm text-gray-500">Your voice note will be attached to this entry</p>
              </div>
            )}
          </div>
          
          {/* Images Preview */}
          {images.length > 0 && (
            <div className="px-4 mt-4">
              <div className="flex overflow-x-auto space-x-3 pb-2">
                {images.map((image, index) => (
                  <div key={index} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Entry image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Tags Input */}
          <div className="px-4 mt-4">
            <div className="flex items-center mb-2">
              <TagIcon size={16} className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button 
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 p-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button 
                onClick={handleAddTag}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-r-lg hover:bg-gray-200"
              >
                Add
              </button>
            </div>
          </div>
          
          {/* Mood Selector */}
          <div className="px-4 mt-4 mb-4">
            <div className="flex items-center mb-2">
              <Smile size={16} className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">How are you feeling?</span>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {['happy', 'peaceful', 'thoughtful', 'neutral', 'sad', 'anxious'].map((moodOption) => (
                <button
                  key={moodOption}
                  onClick={() => setMood(moodOption)}
                  className={`flex flex-col items-center p-2 rounded-lg ${
                    mood === moodOption ? 'bg-blue-50 text-blue-500' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full mb-1 ${getMoodColor(moodOption)} flex items-center justify-center`}>
                    {getMoodEmoji(moodOption)}
                  </div>
                  <span className="text-xs capitalize">{moodOption}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Toolbar */}
        <div className="flex justify-between items-center p-3 border-t border-gray-200">
          <div className="flex space-x-4">
            <button 
              onClick={handleImageUpload}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <Image size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
              <Mic size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
              <PenLine size={20} />
            </button>
          </div>
          
          <button 
            onClick={() => setShowPrompt(!showPrompt)}
            className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
          >
            {showPrompt ? 'Hide Prompt' : 'Show Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEntryModal;