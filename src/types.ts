export interface Entry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood: string;
  images: string[];
  tags: string[];
  audioUrl?: string;
  handwritingData?: string;
  location?: string;
  activity?: {
    type: string;
    duration?: number;
    steps?: number;
    icon: string;
  };
  music?: {
    track: string;
    artist: string;
    icon: string;
  };
}

export interface DailyPrompt {
  id: string;
  text: string;
  category: 'reflection' | 'gratitude' | 'creativity' | 'health' | 'relationships' | 'career';
}

export interface MoodData {
  date: Date;
  mood: string;
  value: number; // 1-5 scale
}

export interface UserPreferences {
  promptCategories: string[];
  theme: 'light' | 'dark' | 'system';
  useBiometricAuth: boolean;
  defaultView: 'timeline' | 'calendar';
}