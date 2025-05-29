import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice'; // Import the game reducer

// Configure the Redux store
const store = configureStore({
  reducer: {
    game: gameReducer, // Assign the gameReducer to the 'game' slice of your state
  },
  // Middleware can be added here. Redux Toolkit includes Redux Thunk by default.
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;