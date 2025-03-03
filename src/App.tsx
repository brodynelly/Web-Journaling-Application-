import React, { useState, useEffect } from 'react';
import { Calendar, PenLine, Image, Mic, Smile, Lock, Menu, X, ChevronLeft, Plus, Search } from 'lucide-react';
import JournalEntry from './components/JournalEntry';
import JournalTimeline from './components/JournalTimeline';
import Sidebar from './components/Sidebar';
import NewEntryModal from './components/NewEntryModal';
import WelcomeScreen from './components/WelcomeScreen';
import { Entry } from './types';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Simulate loading and authentication
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Load mock entries
      const mockEntries: Entry[] = [
        {
          id: '1',
          title: 'Morning at Ocean Beach',
          content: 'I dreamed about surfing last night. Whenever that happens, I know I\'m going to have a great day on the water. The waves were perfect today - not too big, but enough to get some good rides in. The sun was shining and the water was surprisingly warm for this time of year.',
          date: new Date(2025, 3, 15, 9, 30),
          mood: 'happy',
          images: [
            'https://images.unsplash.com/photo-1513553404607-988bf2703777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
            'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
          ],
          tags: ['surfing', 'ocean', 'morning'],
          location: 'Ocean Beach, San Francisco',
          activity: {
            type: 'surfing',
            duration: 120,
            icon: '🏄‍♂️'
          }
        },
        {
          id: '2',
          title: 'Afternoon hike, Mount Diablo',
          content: 'What a day! Shelly and Pedro are in town visiting from LA. We headed out to Mount Diablo to see the wildflowers in bloom. The trails were busy but not overcrowded. We hiked for about 3 hours and had a picnic at the summit. The views of the Bay Area were spectacular today - could see all the way to San Francisco.',
          date: new Date(2025, 3, 14, 15, 45),
          mood: 'peaceful',
          images: [
            'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            'https://images.unsplash.com/photo-1611243038248-5f1b21e1d2e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
          ],
          tags: ['hiking', 'friends', 'nature'],
          location: 'Mount Diablo State Park',
          activity: {
            type: 'walking',
            duration: 180,
            steps: 9500,
            icon: '👟'
          }
        },
        {
          id: '3',
          title: 'Coffee and reflection',
          content: 'Took some time this morning to sit at my favorite café and reflect on the past month. I\'ve been making good progress on my goals, especially with the new project at work. The team is coming together nicely, and I\'m feeling more confident in my leadership role.',
          date: new Date(2025, 3, 13, 8, 15),
          mood: 'thoughtful',
          images: [
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
          ],
          tags: ['reflection', 'coffee', 'morning'],
          location: 'Ritual Coffee, Hayes Valley',
          music: {
            track: 'Weightless',
            artist: 'Marconi Union',
            icon: '🎵'
          }
        }
      ];
      
      setEntries(mockEntries);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNewEntry = (entry: Entry) => {
    setEntries([entry, ...entries]);
    setIsNewEntryModalOpen(false);
    setSelectedEntry(entry);
  };

  const handleSelectEntry = (entry: Entry) => {
    setSelectedEntry(entry);
  };

  const handleBackToTimeline = () => {
    setSelectedEntry(null);
  };

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium text-gray-600">Loading your journal...</h2>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <WelcomeScreen onComplete={handleCompleteOnboarding} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          {selectedEntry ? (
            <button 
              onClick={handleBackToTimeline}
              className="flex items-center text-blue-500 font-medium"
            >
              <ChevronLeft size={20} className="mr-1" />
              Timeline
            </button>
          ) : (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <Menu size={22} />
            </button>
          )}
          
          <h1 className="text-lg font-semibold text-gray-900">
            {selectedEntry ? 'Entry' : 'Journal'}
          </h1>
          
          {!selectedEntry && (
            <div className="flex items-center space-x-1">
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
                <Search size={22} />
              </button>
              <button 
                onClick={() => setIsNewEntryModalOpen(true)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
              >
                <Plus size={22} />
              </button>
            </div>
          )}
          
          {selectedEntry && <div className="w-10"></div>}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {selectedEntry ? (
          <JournalEntry entry={selectedEntry} />
        ) : (
          <JournalTimeline entries={entries} onSelectEntry={handleSelectEntry} />
        )}
      </main>

      {/* Floating Action Button (visible only on timeline) */}
      {!selectedEntry && (
        <div className="fixed bottom-6 right-6 z-10">
          <button 
            onClick={() => setIsNewEntryModalOpen(true)}
            className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={24} className="text-white" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* New Entry Modal */}
      {isNewEntryModalOpen && (
        <NewEntryModal 
          onClose={() => setIsNewEntryModalOpen(false)} 
          onSave={handleNewEntry}
          entryId={`${entries.length + 1}`}
        />
      )}
    </div>
  );
}

export default App;