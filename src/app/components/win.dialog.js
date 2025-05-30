import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid,
} from "@mui/material";
import { GameBoard } from "./game.board";
import { 
    closeWinDialog,
} from "../redux/gameSlice";
import { GameContext } from '../contexts/game.context';

export function WinDialog() {
    const dispatch = useDispatch();
    const {
        mode,
        winDialogOpen,
    } = useSelector((state) => state.gameConfig);
    
    const {
        statusMessage,
        winnerBoards,
        startGame,
        handleCloseWinDialog,
    } = useContext(GameContext);


    
    return (
        <Dialog open={winDialogOpen} onClose={()=> dispatch(closeWinDialog())} maxWidth="md" fullWidth>
            <DialogTitle>🎉 Game Over!</DialogTitle>
            <DialogContent>
                <Typography>{statusMessage} Play again?</Typography>
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
            <Button onClick={handleCloseWinDialog}>No</Button>
            <Button
                onClick={() => {
                startGame();
                dispatch(closeWinDialog());
                }}
            >
                Yes
            </Button>
            </DialogActions>
        </Dialog>
        );
}