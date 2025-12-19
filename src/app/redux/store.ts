import { configureStore } from '@reduxjs/toolkit';
import gameConfigReducer from './gameSlice'; // Import the game reducer

// Configure the Redux store
const store = configureStore({
  reducer: {
    gameConfig: gameConfigReducer, // Assign the gameReducer to the 'game' slice of your state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if needed
    }),
  // Middleware can be added here. Redux Toolkit includes Redux Thunk by default.
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;