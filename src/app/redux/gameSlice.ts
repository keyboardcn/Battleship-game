import { createSlice } from '@reduxjs/toolkit';
// Import your game classes. These will be used within the reducer/actions.
import { OnePlayerGame, TwoPlayerGame } from '../services/games';

// Helper function for creating an empty board (can be moved if used elsewhere)
const createEmptyBoard = (rows, cols) => Array.from({ length: rows }, () => Array(cols).fill("-"));

// Initial state for the game.
// We'll store the game instance itself, board dimensions, game mode, etc.
const initialState = {
  rows: 5,
  cols: 5,
  mode: "1P", // "1P" for one player, "2P" for two players
  winDialogOpen: false,
  statsDialogOpen: false,
};

const gameConfigSlice = createSlice({
  name: 'gameConfig', // Name of the slice, used as a prefix for action types
  initialState, // The initial state defined above
  reducers: {
    setBoardSize: (state, action) => {
      state.rows = action.payload.rows;
      state.cols = action.payload.cols;
    },
    // Reducer to set game mode
    setGameMode: (state, action) => {
      console.log("Game Mode Change:", action)
      state.mode = action.payload;
    },
    openWinDialog: (state) => {
      state.winDialogOpen = true;
    },
    // Reducer to close the win dialog
    closeWinDialog: (state) => {
      state.winDialogOpen = false;
    },
    // Reducer to open the stats dialog
    openStatsDialog: (state) => {
      state.statsDialogOpen = true;
    },
    // Reducer to close the stats dialog
    closeStatsDialog: (state) => {
      state.statsDialogOpen = false;
    },
  },
});

export const {
  setBoardSize,
  setGameMode,
  openWinDialog,
  closeWinDialog,
  openStatsDialog,
  closeStatsDialog,
} = gameConfigSlice.actions;

export default gameConfigSlice.reducer;
