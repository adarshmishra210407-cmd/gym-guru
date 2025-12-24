import { Quest, QuestType, SkillNode, StatType } from './types';

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q_daily_pushups',
    title: 'Strength of the Shadow',
    description: 'Perform 100 Pushups',
    xpReward: 150,
    statReward: StatType.STR,
    type: QuestType.DAILY,
    completed: false,
    target: 100,
    current: 0,
    unit: 'reps'
  },
  {
    id: 'q_daily_run',
    title: 'The Long March',
    description: 'Run 10km (accumulated)',
    xpReward: 200,
    statReward: StatType.VIT,
    type: QuestType.DAILY,
    completed: false,
    target: 10,
    current: 0,
    unit: 'km'
  },
  {
    id: 'q_habit_water',
    title: 'Elixir of Life',
    description: 'Drink 3 Liters of water',
    xpReward: 50,
    statReward: StatType.INT,
    type: QuestType.LIFESTYLE,
    completed: false,
    target: 3000,
    current: 0,
    unit: 'ml'
  }
];

export const SKILL_TREE: SkillNode[] = [
  // Push Progression
  { id: 'push_1', name: 'Wall Pushup', level: 1, description: 'Basic pressing strength.', requirements: [], status: 'mastered', category: 'Push' },
  { id: 'push_2', name: 'Knee Pushup', level: 2, description: 'Building floor strength.', requirements: ['push_1'], status: 'available', category: 'Push' },
  { id: 'push_3', name: 'Pushup', level: 3, description: 'Standard form.', requirements: ['push_2'], status: 'locked', category: 'Push' },
  { id: 'push_4', name: 'Diamond Pushup', level: 4, description: 'Tricep focus.', requirements: ['push_3'], status: 'locked', category: 'Push' },
  { id: 'push_5', name: 'Pseudo Planche', level: 5, description: 'Shoulder lean.', requirements: ['push_4'], status: 'locked', category: 'Push' },
  // Pull Progression
  { id: 'pull_1', name: 'Door Row', level: 1, description: 'Basic back engagement.', requirements: [], status: 'mastered', category: 'Pull' },
  { id: 'pull_2', name: 'Inverted Row', level: 2, description: 'Horizontal pulling.', requirements: ['pull_1'], status: 'available', category: 'Pull' },
  { id: 'pull_3', name: 'Pull-up', level: 3, description: 'Vertical pulling.', requirements: ['pull_2'], status: 'locked', category: 'Pull' },
  { id: 'pull_4', name: 'Muscle-up', level: 10, description: 'The explosive transition.', requirements: ['pull_3'], status: 'locked', category: 'Pull' },
];

export const RANKS = ['E', 'D', 'C', 'B', 'A', 'S'];