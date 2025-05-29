import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { closeStatsDialog } from '../redux/gameSlice';

export function StatusDialog() {
  const dispatch = useDispatch();
  const {
    statsDialogOpen,
    gameInstance
  } = useSelector((state) => state.game);

  const handleCloseStatsDialog = () => {
    dispatch(closeStatsDialog());
  };

  return (
    <Dialog open={statsDialogOpen} onClose={handleCloseStatsDialog} maxWidth="md" fullWidth>
      <DialogTitle>📊 Game Stats</DialogTitle>
      <DialogContent>
        {gameInstance && (
          <pre>{JSON.stringify(gameInstance.gameStats(), null, 2)}</pre>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseStatsDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
