import React from "react";
import { useState, useContext, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { Container, Button, TextField, Grid, Typography } from "@mui/material";
import { ShowBoards } from "./show.boards";
import GameControls from "./game.controls";
import { WinDialog } from "./win.dialog";
import { StatusDialog } from "./status.dialog";
import thImage from "../../assets/battleship.png";

import { setBoardSize, setGameMode } from "../redux/gameSlice";
import {
  PageComponent,
  SectionComponent,
  CenterCardComponent,
} from "../commons/common.components";

import ResizeComponent from "../battleShip/ResizeComponent";

import { GameContext } from "../contexts/game.context";
export default function BattleshipUI() {
  const dispatch = useAppDispatch();
  const { rows, cols, mode } = useAppSelector((state) => state.gameConfig);

  const {
    boards,
    statusMessage,
    handleShoot,
  } = useContext(GameContext);

  const [rowInput, setRowInput] = useState("");
  const [colInput, setColInput] = useState("");

  const onReset = (rows: number) => {
    console.log("rows and ships", rows, rows);
    dispatch(setBoardSize({ rows: rows, cols: rows }));
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
    <PageComponent>
      <SectionComponent>
        <CenterCardComponent id="header">
          <img
            src={thImage}
            className="h-14 bg-transparent"
            alt="Battleship Logo"
          />
          <h2 className="font-bold text-blue-600 text-5xl max-md:text-2xl">Battleship Game</h2>
        </CenterCardComponent>
      </SectionComponent>

      <SectionComponent>
        <CenterCardComponent id="player-row">
          <select
            id="player-select"
            className="w-full h-12 text-blue-600 font-bold hover:bg-green-300 border border-amber-300
            focus:bg-green-300"
            value={mode}
            onChange={(e) => dispatch(setGameMode(e.target.value))}
          >
            <option value="1P" className="text-blue-600 hover:bg-blue-300">
              One Player
            </option>
            <option value="2P" className="text-blue-600 hover:bg-blue-300">
              Two Players
            </option>
          </select>
        </CenterCardComponent>
        <ResizeComponent resize={onReset}></ResizeComponent>
      </SectionComponent>
      
      <ShowBoards />
      
      <SectionComponent>

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

        <Typography sx={{ mt: 2 }}>{statusMessage}</Typography>

        <WinDialog />

        <StatusDialog />
      </SectionComponent>
    </PageComponent>
  );
}
