import React, { useState, useContext } from "react";
import { useAppSelector } from '../redux/hooks';

import { MatrixOfSquareComponent, CenterCardComponent, SectionComponent } from '../commons/common.components';
import { GameContext } from '../contexts/game.context';
export function ShowBoards() {
  const {
    mode,
  } = useAppSelector((state) => state.gameConfig);

  const {
    playerTurn,
    boards,
    handleShoot,
  } = useContext(GameContext);
  

  return (
    <SectionComponent>
      <h2 className="font-bold text-blue-600 text-2xl p-5 justify-center"
      >Game Board Turn:{mode === "2P" ? ` -> ${playerTurn === 0 ? "P1" : "P2"}` : ""}</h2>
      <CenterCardComponent id="board-card-1">
                <MatrixOfSquareComponent 
                matrix={ boards.length > 1 ? boards[1-playerTurn] : boards[0]}
                handleMatrixCellHit={handleShoot}
                ></MatrixOfSquareComponent>
      </CenterCardComponent>
    </SectionComponent>
  );
}
