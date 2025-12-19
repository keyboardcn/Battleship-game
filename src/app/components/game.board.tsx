import React from "react";
import {
  Grid,
  Paper,
} from "@mui/material";

export function GameBoard({ board }) {
  const numRows = board.length;
  const numCols = board[0]?.length || 0;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container direction="column" spacing={0.5}>
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <Grid key={rowIndex}>
            <Grid container spacing={0.5}>
              {Array.from({ length: numCols }).map((_, colIndex) => (
                <Grid key={colIndex}>
                  <Paper sx={{ width: 30, height: 30, textAlign: "center", lineHeight: "30px" }}>
                    {board[rowIndex][colIndex] === "-" ? ""
                      : board[rowIndex][colIndex] === "X" ? "💥"
                      : board[rowIndex][colIndex] === "O" ? "🟦"
                      : ""}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}