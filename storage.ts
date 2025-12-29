
import { GeminiResponse } from '../types';

const STORAGE_KEY = 'igemini_history_v1';

export const saveResponse = (item: GeminiResponse) => {
  const history = getHistory();
  const updated = [item, ...history];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getHistory = (): GeminiResponse[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getResponseById = (id: string): GeminiResponse | undefined => {
  return getHistory().find(item => item.id === id);
};

export const deleteResponse = (id: string) => {
  const history = getHistory();
  const updated = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearAllHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
