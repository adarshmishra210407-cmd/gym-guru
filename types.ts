export enum StatType {
  STR = 'Strength',
  AGI = 'Agility',
  VIT = 'Vitality',
  INT = 'Intelligence', // Diet/Knowledge
  PER = 'Perception',   // Form/Technique
}

export enum QuestType {
  DAILY = 'Daily',
  SKILL = 'Skill Mastery',
  LIFESTYLE = 'Lifestyle',
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  statReward?: StatType;
  type: QuestType;
  completed: boolean;
  target: number;
  current: number;
  unit: string;
}

export interface SkillNode {
  id: string;
  name: string;
  level: number; // 1-10
  description: string;
  requirements: string[]; // IDs of required previous skills
  status: 'locked' | 'available' | 'mastered';
  category: 'Push' | 'Pull' | 'Legs' | 'Core' | 'Static';
}

export interface UserState {
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  stats: Record<StatType, number>;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  streak: number;
  completedQuests: string[];
}

export interface DietPlan {
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  meals: {
    name: string;
    description: string;
    calories: number;
    ingredients: string[];
  }[];
}