import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './slices/membersSlice';
import roleReducer from './slices/roleSlice';

// 1. Helper to load state from LocalStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('teamPulseState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// 2. Helper to save state to LocalStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('teamPulseState', serializedState);
  } catch {
    // ignore write errors
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    members: membersReducer,
    role: roleReducer
  },
  preloadedState // Load saved data on startup
});

// 3. Subscribe to store updates
store.subscribe(() => {
  saveState({
    members: store.getState().members,
    role: store.getState().role
  });
});