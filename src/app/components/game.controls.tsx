import {
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useDispatch } from 'react-redux'; // Needed for dispatching dialog actions
import React, { useContext } from 'react'; // Needed for gameInstance
import { GameContext } from '../contexts/game.context'; // Import GameContext

// GameControls component receives props from BattleshipUI to manage its state and actions
function GameControls({
  rows,
  cols,
  rowInput,
  setRowInput,
  colInput,
  setColInput,
  onShootClick,
  isGameStarted, // Prop to control visibility
  isSingleBoardLayout
}) {
  const dispatch = useDispatch(); // Get dispatch for Redux actions
  const { handleOpenStatsDialog } = useContext(GameContext); // Get gameInstance and dialog handler from context
  const gridItemXs = isSingleBoardLayout ? 12 : 'auto';
  return (
    <>
      {/* Shoot controls, visible only if game has started */}
      <Grid container direction={isSingleBoardLayout ? "column" : "row"} spacing={2} sx={{ mt: 2 }} visibility={isGameStarted ? "visible" : "hidden"}>

        {/* Show Game Stats button, visible only if game has started */}
          <Grid size={{ xs: gridItemXs }} visibility={isGameStarted ? "visible" : "hidden"}>
            <Button variant="outlined" onClick={handleOpenStatsDialog} fullWidth={isSingleBoardLayout}>
              Show Game Stats
            </Button>
          </Grid>
      </Grid>

    </>
  );
}

export default GameControls;