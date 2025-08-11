import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'aurora_user_settings';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.error('Failed to save settings to localStorage');
  }
}

const persisted = loadFromStorage();

const initialState =
  persisted || {
    userGender: 'neutral', 
    userDisplayName: '',
  };

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setUserGender: (state, action) => {
      state.userGender = action.payload || 'neutral';
      saveToStorage(state);
    },
    setUserDisplayName: (state, action) => {
      state.userDisplayName = (action.payload || '').trim();
      saveToStorage(state);
    },
    resetSettings: (state) => {
      state.userGender = 'neutral';
      state.userDisplayName = '';
      saveToStorage(state);
    },
  },
});

export const { setUserGender, setUserDisplayName, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer; 