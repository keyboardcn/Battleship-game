import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { closeStatsDialog } from '../redux/gameSlice';
import { GameContext } from '../contexts/game.context';

export function StatusDialog() {
  const dispatch = useDispatch();
  const {
    statsDialogOpen,
  } = useSelector((state) => state.gameConfig);

  const {
    gameInstance,  
  } = useContext(GameContext);

  return (
    <Dialog open={statsDialogOpen} onClose={() => dispatch(closeStatsDialog())} maxWidth="md" fullWidth>
      <DialogTitle>📊 Game Stats</DialogTitle>
      <DialogContent>
        {gameInstance && (
          <pre>{JSON.stringify(gameInstance.gameStats(), null, 2)}</pre>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeStatsDialog())}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
