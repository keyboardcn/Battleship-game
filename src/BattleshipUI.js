import React, { useState } from "react";
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Select,
} from "@mui/material";
import { OnePlayerGame, TwoPlayerGame } from "./services/games";

const createEmptyBoard = (rows, cols) => Array.from({ length: rows }, () => Array(cols).fill("-"));
const seen = [];

function GameBoard({ board }) {
  const numRows = board.length;
  const numCols = board[0]?.length || 0;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container direction="column" spacing={0.5}>
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <Grid item key={rowIndex}>
            <Grid container spacing={0.5}>
              {Array.from({ length: numCols }).map((_, colIndex) => (
                <Grid item key={colIndex}>
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

export default function BattleshipUI() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [mode, setMode] = useState("1P");
  const [game, setGame] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(0);
  const [boards, setBoards] = useState([]);
  const [rowInput, setRowInput] = useState("");
  const [colInput, setColInput] = useState("");
  const [status, setStatus] = useState("");
  const [winDialog, setWinDialog] = useState(false);
  const [statsDialog, setStatsDialog] = useState(false);
  const [winnerBoards, setWinnerBoards] = useState([]);



  const startGame = () => {
    let newGame;
    if (mode === "1P") {
      newGame = new OnePlayerGame("Player1", rows, cols);
    } else {
      newGame = new TwoPlayerGame("Player1", "Player2", rows, cols);
    }
    setGame(newGame);
    console.log("Game started:", newGame);
    setBoards(mode === "1P" 
      ? [newGame.player.board.board] 
      : [newGame.player1.board.board, newGame.player2.board.board]);
    setPlayerTurn(0);
    setStatus("");
    setWinnerBoards([]);
  };

  const handleShoot = () => {
    if (!game || rowInput === "" || colInput === "") return;
    const row = parseInt(rowInput);
    const col = parseInt(colInput);
    const marker = `${row}-${col}`;
    console.log(seen.includes(marker), seen);
    if (seen.includes(marker) || row < 0 || row >= rows || col < 0 || col >= cols) {
      setStatus("❌Invalid shot or already shot here!");
      return;
    }
    const result = game.alternativeShoot(row, col);
    seen.push(marker);
    const newBoards = mode === "1P" 
      ? [game.player.board.board] 
      : [game.player1.board.board, game.player2.board.board];
    setBoards([...newBoards]);
    setStatus(result.hit ? `🔥 ${result.shooter} hit!` : `❌ ${result.shooter} missed!`);
    if (result.win) {
      setWinnerBoards([...newBoards]);
      setWinDialog(true);
    }
    setPlayerTurn(mode === "2P" ? (playerTurn === 0 ? 1 : 0) : 0);
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }} maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Battleship Game
      </Typography>

      <Grid container spacing={10} alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Select value={mode} onChange={(e) => setMode(e.target.value)} displayEmpty>
            <MenuItem value="1P">One Player</MenuItem>
            <MenuItem value="2P">Two Players</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            type="number"
            label="Rows"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item>
          <TextField
            type="number"
            label="Cols"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value))}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={startGame}>
            Start Game
          </Button>
        </Grid>
      </Grid>

      {boards.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Game Board {mode === "2P" ? `- ${playerTurn === 0 ? "Player1's Turn" : "Player2's Turn"}` : ""}
          </Typography>
          <Grid container spacing={2}>
            {boards.map((b, idx) => (
              <Grid item xs={6} key={idx}>
                <Typography variant="subtitle1">{mode === "1P" ? "Player" : `Player ${idx + 1}`}</Typography>
                <GameBoard board={b} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }} visibility={boards.length > 0 ? "visible" : "hidden"}>
        <Grid item>
          <TextField
            label="Row"
            type="number"
            value={rowInput}
            onChange={(e) => setRowInput(Math.min(rows-1, parseInt(e.target.value)))}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Col"
            type="number"
            value={colInput}
            onChange={(e) => setColInput(Math.min(cols-1, parseInt(e.target.value)))}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleShoot}>
            Let's Shoot
          </Button>
        </Grid>

      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }} visibility={boards.length > 0 ? "visible" : "hidden"}>
        <Grid visibility={boards.length > 0 ? "visible" : "hidden"}>
          <Button variant="outlined" onClick={() => setStatsDialog(true)}>
            Show Game Stats
          </Button>
        </Grid>
      </Grid>

      <Typography sx={{ mt: 2 }}>{status}</Typography>

      <Dialog open={winDialog} onClose={() => setWinDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>🎉 Game Over!</DialogTitle>
        <DialogContent>
          <Typography>{status} Play again?</Typography>
          {winnerBoards.length > 0 && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {winnerBoards.map((b, idx) => (
                <Grid item xs={6} key={idx}>
                  <Typography variant="subtitle1">{mode === "1P" ? "Player" : `Player ${idx + 1}`}</Typography>
                  <GameBoard board={b} />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWinDialog(false)}>No</Button>
          <Button
            onClick={() => {
              startGame();
              setWinDialog(false);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={statsDialog} onClose={() => setStatsDialog(false)}>
        <DialogTitle>📊 Game Stats</DialogTitle>
        <DialogContent>
          {game && (
            <pre>{JSON.stringify(game.gameStats(), null, 2)}</pre>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
    
  );
}
