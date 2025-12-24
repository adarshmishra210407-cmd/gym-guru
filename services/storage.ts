import { UserState, Quest } from '../types';

const KEYS = {
  USER: 'SHADOW_SYSTEM_USER',
  QUESTS: 'SHADOW_SYSTEM_QUESTS',
  AUTH: 'SHADOW_SYSTEM_AUTH',
};

export const StorageService = {
  saveUser: (user: UserState) => {
    try {
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.error("System Memory Error:", e);
    }
  },

  loadUser: (): UserState | null => {
    try {
      const data = localStorage.getItem(KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveQuests: (quests: Quest[]) => {
    try {
      localStorage.setItem(KEYS.QUESTS, JSON.stringify(quests));
    } catch (e) {
      console.error("System Log Error:", e);
    }
  },

  loadQuests: (): Quest[] | null => {
    try {
      const data = localStorage.getItem(KEYS.QUESTS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  setAuth: (isAuth: boolean) => {
    localStorage.setItem(KEYS.AUTH, JSON.stringify(isAuth));
  },

  checkAuth: (): boolean => {
    const data = localStorage.getItem(KEYS.AUTH);
    return data ? JSON.parse(data) : false;
  },

  clearAll: () => {
    localStorage.clear();
  }
};
