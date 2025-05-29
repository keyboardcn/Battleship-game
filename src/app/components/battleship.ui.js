import React from 'react';
import { useState } from "react";
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
import thImage from "../../assets/th.png";

import {
  setBoardSize,
  setGameMode,
  startGame,
  processShoot,
  openStatsDialog,
  closeStatsDialog,
} from '../redux/gameSlice';


export default function BattleshipUI() {
  const dispatch = useDispatch();
  const {
    rows,
    cols,
    mode,
    gameInstance, // The game object itself
    playerTurn,
    boards,
    statusMessage,
    statsDialogOpen,
  } = useSelector((state) => state.game);

  const [rowInput, setRowInput] = useState("");
  const [colInput, setColInput] = useState("");


  const handleStartGame = () => {
    dispatch(startGame()); // Dispatch the startGame action to initialize the game}));
    setRowInput(""); // Clear input fields after shot
    setColInput("");
  };

  const handleShoot = () => {
    // Dispatch the processShoot action with row and col as payload
    dispatch(processShoot({ row: parseInt(rowInput), col: parseInt(colInput) }));
    setRowInput(""); // Clear input fields after shot
    setColInput("");
  };

  const handleOpenStatsDialog = () => {
    dispatch(openStatsDialog());
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }} maxWidth="md">
      <img src={thImage} alt="Battleship Logo" />
      <Typography variant="h4" gutterBottom>
        Battleship Game
      </Typography>

      <Grid container spacing={10} alignItems="center" sx={{ mb: 2 }}>
        <Grid>
          <Select value={mode} onChange={(e) => dispatch(setGameMode(e.target.value))} displayEmpty>
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
          <Button variant="contained" onClick={handleStartGame}>
            Start Game
          </Button>
        </Grid>
      </Grid>

      {boards.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Game Board {mode === "2P" ? `- ${playerTurn === 0 ? "Player1's Turn" : "Player2's Turn"}` : ""}
          </Typography>
          <Grid container spacing={2} justifyContent={"center"}>
            {boards.map((b, idx) => (
              <Grid key={idx}>
                <Typography variant="subtitle1">{mode === "1P" ? "Player" : `Player ${idx + 1}`}</Typography>
                <GameBoard board={b} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

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
          <Button variant="outlined" onClick={handleShoot}>
            Let's Shoot
          </Button>
        </Grid>

      </Grid>
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
