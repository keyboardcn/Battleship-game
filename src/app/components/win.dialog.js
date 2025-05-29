import React from 'react';
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
import { closeWinDialog, startGame } from "../redux/gameSlice";

export function WinDialog() {
    const dispatch = useDispatch();
    const {
        mode,
        statusMessage,
        winDialogOpen,
        winnerBoards,
    } = useSelector((state) => state.game);
    
    const handleCloseWinDialog = () => {
        dispatch(closeWinDialog());
    };
    
    return (
        <Dialog open={winDialogOpen} onClose={handleCloseWinDialog} maxWidth="md" fullWidth>
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
                dispatch(startGame());
                handleCloseWinDialog();
                }}
            >
                Yes
            </Button>
            </DialogActions>
        </Dialog>
        );
}