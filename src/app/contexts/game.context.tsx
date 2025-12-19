import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { OnePlayerGame, TwoPlayerGame } from '../services/games';
// Import dialog actions from Redux
import { 
    openWinDialog, 
    closeWinDialog, 
    openStatsDialog, 
    closeStatsDialog 
} from '../redux/gameSlice';

// Create the GameContext
export const GameContext = createContext(null);

// GameProvider component to manage the game instance and related game state
export const GameProvider = ({ children }) => {
  const { rows, cols, mode } = useAppSelector((state) => state.gameConfig);
  const dispatch = useAppDispatch(); // Get dispatch for Redux actions

  const [gameInstance, setGameInstance] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(0); // 0 for Player1, 1 for Player2
  const [boards, setBoards] = useState([]); // Array of boards to display
  const [statusMessage, setStatusMessage] = useState(""); // Message displayed to the user
  const [winnerBoards, setWinnerBoards] = useState([]); // Boards to display in win dialog
  const [seenShots, setSeenShots] = useState([]); // To track shots already made in the current game

  // Function to start a new game
  const startGame = () => {
    let newGame;
    if (mode === "1P") {
      newGame = new OnePlayerGame("Player1", rows, cols);
    } else {
      newGame = new TwoPlayerGame("Player1", "Player2", rows, cols);
    }
    setGameInstance(newGame);
    setSeenShots([]); // Reset seen shots for the new game
    setPlayerTurn(0); // Reset turn to Player 1
    setStatusMessage(""); // Clear status message

    dispatch(closeWinDialog());
    dispatch(closeStatsDialog());
    setWinnerBoards([]); // Clear winner boards

    // Set initial boards based on the new game instance
    setBoards(mode === "1P"
      ? [newGame.player.board.board]
      : [newGame.player1.board.board, newGame.player2.board.board]);

    console.log("Game started (Context):", newGame);
  };

  // Function to handle a shot attempt
  const handleShoot = (rowInput, colInput) => {
    if (rowInput === "" || colInput === "") {
      setStatusMessage("Please enter both row and column!");
      return;
    }
    if (!gameInstance) {
      setStatusMessage("Game not started!");
      return;
    }

    const row = parseInt(rowInput);
    const col = parseInt(colInput);
    const marker = `P${playerTurn}.${row}.${col}`;

    if (seenShots.includes(marker) || row < 0 || row >= rows || col < 0 || col >= cols) {
      setStatusMessage("❌Invalid shot or already shot here!");
      return;
    }

    // Perform the shot using the game instance
    const result = gameInstance.alternativeShoot(row, col);
    setSeenShots((prev) => [...prev, marker]); // Add shot to seen list

    // Update boards state from the game instance
    const newBoards = mode === "1P"
      ? [gameInstance.player.board.board]
      : [gameInstance.player1.board.board, gameInstance.player2.board.board];
    setBoards([...newBoards]); // Ensure state update triggers re-render

    // Update status message
    setStatusMessage(result.hit ? `🔥 ${result.shooter} hit!` : `❌ ${result.shooter} missed!`);

    // Check for winner
    if (result.winner) {
      setWinnerBoards([...newBoards]); // Capture final board state
      dispatch(openWinDialog()); // Open win dialog via Redux
    }

    // Switch player turn in 2P mode
    if (mode === "2P") {
      setPlayerTurn(prevTurn => (prevTurn === 0 ? 1 : 0));
    }
  };

  // Handlers for dialogs now dispatch Redux actions
  const handleCloseWinDialog = () => dispatch(closeWinDialog());
  const handleOpenStatsDialog = () => dispatch(openStatsDialog());
  const handleCloseStatsDialog = () => dispatch(closeStatsDialog());


  // Value provided by the context
  const contextValue = {
    gameInstance,
    playerTurn,
    boards,
    statusMessage,
    winnerBoards,
    startGame,
    handleShoot,
    handleCloseWinDialog,
    handleOpenStatsDialog,
    handleCloseStatsDialog,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};