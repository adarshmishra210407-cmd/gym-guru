import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserState, Quest, StatType } from '../types';
import { INITIAL_QUESTS } from '../constants';
import { StorageService } from '../services/storage';

interface GameContextType {
  user: UserState;
  quests: Quest[];
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
  completeQuest: (questId: string) => void;
  addXp: (amount: number) => void;
  updateStat: (stat: StatType, amount: number) => void;
  toggleQuestProgress: (questId: string, amount: number) => void;
}

const defaultUser: UserState = {
  name: 'Player',
  level: 1,
  xp: 0,
  maxXp: 100,
  stats: {
    [StatType.STR]: 10,
    [StatType.AGI]: 10,
    [StatType.VIT]: 10,
    [StatType.INT]: 10,
    [StatType.PER]: 10,
  },
  rank: 'E',
  streak: 1,
  completedQuests: []
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from Storage or Default
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => StorageService.checkAuth());
  
  const [user, setUser] = useState<UserState>(() => {
    return StorageService.loadUser() || defaultUser;
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    return StorageService.loadQuests() || INITIAL_QUESTS;
  });

  // --- Persistence Effects ---
  useEffect(() => {
    if (isAuthenticated) {
      StorageService.saveUser(user);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      StorageService.saveQuests(quests);
    }
  }, [quests, isAuthenticated]);

  useEffect(() => {
    StorageService.setAuth(isAuthenticated);
  }, [isAuthenticated]);

  // --- Auth Logic ---
  const login = (name: string) => {
    // If user already exists in storage, we just update auth. 
    // If it's a new user (defaultUser name is Player), we set the name.
    if (user.name === 'Player' && name) {
        setUser(prev => ({ ...prev, name }));
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Optional: Clear data on logout? For now, we keep data, just lock access.
    // StorageService.clearAll(); 
  };

  // --- Game Logic ---
  useEffect(() => {
    if (user.xp >= user.maxXp) {
      setUser(prev => ({
        ...prev,
        level: prev.level + 1,
        xp: prev.xp - prev.maxXp,
        maxXp: Math.floor(prev.maxXp * 1.5),
        rank: prev.level > 50 ? 'S' : prev.level > 40 ? 'A' : prev.level > 30 ? 'B' : prev.level > 20 ? 'C' : prev.level > 10 ? 'D' : 'E'
      }));
      // In a real app, trigger a "Level Up" modal here
      // console.log("LEVEL UP!"); 
    }
  }, [user.xp, user.maxXp]);

  const addXp = (amount: number) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const updateStat = (stat: StatType, amount: number) => {
    setUser(prev => ({
      ...prev,
      stats: { ...prev.stats, [stat]: prev.stats[stat] + amount }
    }));
  };

  const completeQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      setQuests(prev => prev.map(q => q.id === questId ? { ...q, completed: true } : q));
      addXp(quest.xpReward);
      if (quest.statReward) {
        updateStat(quest.statReward, 1);
      }
      setUser(prev => ({
         ...prev,
         completedQuests: [...prev.completedQuests, questId]
      }));
    }
  };

  const toggleQuestProgress = (questId: string, amount: number) => {
    setQuests(prev => prev.map(q => {
      if (q.id === questId && !q.completed) {
        const newCurrent = Math.min(q.target, q.current + amount);
        if (newCurrent >= q.target) {
            setTimeout(() => completeQuest(questId), 0);
        }
        return { ...q, current: newCurrent };
      }
      return q;
    }));
  };

  return (
    <GameContext.Provider value={{ 
      user, 
      quests, 
      isAuthenticated, 
      login, 
      logout,
      completeQuest, 
      addXp, 
      updateStat, 
      toggleQuestProgress 
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
};
