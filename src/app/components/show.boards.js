import React, { useState, useContext } from "react";
import { useSelector } from 'react-redux';
import {
    Container,
  Grid,
  Typography,
} from "@mui/material";
import { GameBoard } from "./game.board";

import { GameContext } from '../contexts/game.context';
export function ShowBoards() {
  const {
    mode,
  } = useSelector((state) => state.gameConfig);

  const {
    playerTurn,
    boards,
  } = useContext(GameContext);

  return (
    <Container>
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
    </Container>
  );
}
