import { DailyPrompt } from '../types';

const prompts: DailyPrompt[] = [
  {
    id: '1',
    text: 'What made you smile today?',
    category: 'gratitude'
  },
  {
    id: '2',
    text: 'Describe a challenge you faced recently and what you learned from it.',
    category: 'reflection'
  },
  {
    id: '3',
    text: 'If you could give advice to your younger self, what would it be?',
    category: 'reflection'
  },
  {
    id: '4',
    text: "What are three things you're grateful for today?",
    category: 'gratitude'
  },
  {
    id: '5',
    text: 'Describe your ideal day. What would you do?',
    category: 'creativity'
  },
  {
    id: '6',
    text: "What's one small step you can take today toward a goal that matters to you?",
    category: 'career'
  },
  {
    id: '7',
    text: 'Reflect on a conversation that impacted you recently. What made it meaningful?',
    category: 'relationships'
  },
  {
    id: '8',
    text: 'How did you take care of your physical or mental health today?',
    category: 'health'
  },
  {
    id: '9',
    text: "What's something you're looking forward to in the coming weeks?",
    category: 'reflection'
  },
  {
    id: '10',
    text: 'Describe a place that makes you feel peaceful. What do you love about it?',
    category: 'reflection'
  }
];

export function getRandomPrompt(): DailyPrompt {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
}

export function getPromptsByCategory(category: string): DailyPrompt[] {
  return prompts.filter(prompt => prompt.category === category);
}