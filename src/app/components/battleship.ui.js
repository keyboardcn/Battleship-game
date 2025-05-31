import React from "react";
import { useState, useContext } from "react";
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
import { ShowBoards } from "./show.boards";
import GameControls  from "./game.controls";
import { WinDialog } from "./win.dialog";
import { StatusDialog } from "./status.dialog";
import thImage from "../../assets/battleship.gif";

import {
  setBoardSize,
  setGameMode} from '../redux/gameSlice';

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

  const isGameStarted = boards.length > 0;
  const isSingleBoardLayout = boards.length === 1;
  console.log("BattleshipUI: isSingleBoardLayout", isSingleBoardLayout);
  
  return (
    <Container sx={{ mt: 4, mb: 4 }} maxWidth="md">
      <img src={thImage} alt="Battleship Logo" width="100%" />
      <Typography variant="h4" gutterBottom>
        Battleship Game
      </Typography>

      <Grid container spacing={2} alignItems="center" border={1} borderColor="grey.300" sx={{ mb: 2, p: 2 }}>
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

      {isSingleBoardLayout ? (
            // Layout for 1P mode: GameBoard and GameControls in the same row
            <Grid container spacing={2} boarder={2} borderColor="grey.300" sx={{ mb: 2, p: 2 }}>
              <Grid xs={12} md={6}>
                <ShowBoards />
              </Grid>
              <Grid xs={12} md={6} direction={"column"} container spacing={2} justifyContent={"center"}>
                <GameControls
                  rows={rows}
                  cols={cols}
                  rowInput={rowInput}
                  setRowInput={setRowInput}
                  colInput={colInput}
                  setColInput={setColInput}
                  onShootClick={onShootClick}
                  isGameStarted={isGameStarted}
                  isSingleBoardLayout={true}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} boarder={1} borderColor="grey.300" sx={{ mb: 2, p: 2 }}>
              <ShowBoards />
              <GameControls
                rows={rows}
                cols={cols}
                rowInput={rowInput}
                setRowInput={setRowInput}
                colInput={colInput}
                setColInput={setColInput}
                onShootClick={onShootClick}
                isGameStarted={isGameStarted} 
                isSingleBoardLayout={false}
              />
            </Grid>
          )
      }
      

      <Typography sx={{ mt: 2 }}>{statusMessage}</Typography>

      <WinDialog />

      <StatusDialog />
    </Container>
    
  );
}
