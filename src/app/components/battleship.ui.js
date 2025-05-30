import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import { GameBoard } from "./game.board";
import { WinDialog } from "./win.dialog";
import { StatusDialog } from "./status.dialog";
import thImage from "../../assets/battleship.gif";

import {
  setBoardSize,
  setGameMode,
  closeWinDialog,
  openStatsDialog,
  closeStatsDialog
} from '../redux/gameSlice';

import { GameContext } from '../contexts/game.context';
export default function BattleshipUI() {
  const dispatch = useDispatch();
  const {
    rows,
    cols,
    mode,
  } = useSelector((state) => state.gameConfig);

  const {
    gameInstance,
    playerTurn,
    boards,
    statusMessage,
    startGame,
    handleShoot,
    handleOpenStatsDialog,
  } = useContext(GameContext);


  const [rowInput, setRowInput] = useState("");
  const [colInput, setColInput] = useState("");


  const onStartGameClick = () => {
    startGame(); // Dispatch the startGame action to initialize the game}));
    setRowInput(""); // Clear input fields after shot
    setColInput("");
  };

  const onShootClick = () => {
    // Dispatch the processShoot action with row and col as payload
    handleShoot(rowInput, colInput);
    setRowInput(""); // Clear input fields after shot
    setColInput("");
  };


  return (
    <Container sx={{ mt: 4, mb: 4 }} maxWidth="md">
      <img src={thImage} alt="Battleship Logo" width="100%" />
      <Typography variant="h4" gutterBottom>
        Battleship Game
      </Typography>

      <Grid container spacing={10} alignItems="center" sx={{ mb: 2 }}>
        <Grid>
          <Select 
            value={mode} 
            onChange={(e) => dispatch(setGameMode(e.target.value))} 
            displayEmpty
            inputProps={{ 'aria-label': 'Game Mode' }}>
            <MenuItem value="1P">One Player</MenuItem>
            <MenuItem value="2P">Two Players</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid>
          <TextField
            type="number"
            label="Rows"
            value={rows}
            onChange={(e) => dispatch(setBoardSize({ rows: parseInt(e.target.value), cols }))}
          />
        </Grid>
        <Grid>
          <TextField
            type="number"
            label="Cols"
            value={cols}
            onChange={(e) => dispatch(setBoardSize({ rows, cols: parseInt(e.target.value) }))}
          />
        </Grid>
        <Grid>
          <Button variant="contained" onClick={onStartGameClick}>
            Start Game
          </Button>
        </Grid>
      </Grid>
      
      {/* Display boards if game has started */}
      {boards.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Game Board {mode === "2P" ? `- ${playerTurn === 0 ? "Player1's Turn" : "Player2's Turn"}` : ""}
          </Typography>
          <Grid container spacing={2} justifyContent={"space-evenly"} >
            {boards.map((b, idx) => (
              <Grid key={idx}>
                <Typography variant="subtitle1">{mode === "1P" ? "Player" : `Player ${idx + 1}`}</Typography>
                <GameBoard board={b} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Shoot controls and stats button, visible only if game has started */}
      <Grid container spacing={2} sx={{ mt: 2 }} visibility={boards.length > 0 ? "visible" : "hidden"}>
        <Grid>
          <TextField
            label="Row"
            type="number"
            value={rowInput}
            onChange={(e) => setRowInput(Math.min(rows-1, parseInt(e.target.value)))}
          />
        </Grid>
        <Grid>
          <TextField
            label="Col"
            type="number"
            value={colInput}
            onChange={(e) => setColInput(Math.min(cols-1, parseInt(e.target.value)))}
          />
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={onShootClick} disabled={!gameInstance}>
            Let's Shoot
          </Button>
        </Grid>
      </Grid>
      {/* Show game status if available */}
      <Grid container spacing={2}  visibility={boards.length > 0 ? "visible" : "hidden"}>
        <Grid visibility={boards.length > 0 ? "visible" : "hidden"}>
          <Button variant="outlined" onClick={handleOpenStatsDialog}>
            Show Game Stats
          </Button>
        </Grid>
      </Grid>

      <Typography sx={{ mt: 2 }}>{statusMessage}</Typography>

      <WinDialog />

      <StatusDialog />
    </Container>
    
  );
}
