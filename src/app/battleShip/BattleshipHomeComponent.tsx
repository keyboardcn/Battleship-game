import React, { useState } from "react";
import "./BattleshipHomeComponent.css";
import ResizeComponent from "./ResizeComponent";
import {
  CenterCardComponent,
  LabelInputComponent,
  MatrixOfSquareComponent,
  SectionComponent,
  PageComponent,
} from "../commons/common.components";
export default function BattleshipHomeComponent() {
  const [action, setAction] = useState("Start");
  const [size, setSize] = useState(5);
  const [matrix, setMatrix] = useState([
    ["$", "-", "-", "-", "-"],
    ["-", "-", "-", "$", "$"],
    ["-", "$", "-", "$", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
  ]);

  const resetBMatrix = (size: number, ships: number) => {
    const newMatrix: string[][] = Array.from({ length: size }, () =>
      Array(size).fill("-")
    );

    setSize(size);

    const positions = randomShips(size, ships);
    positions.forEach((pos) => {
      const row = Math.floor(pos / size);
      const col = pos % size;
      newMatrix[row][col] = "$"; // Place ship
    });
    setMatrix(newMatrix);
    console.log("New board matrix:", newMatrix);
  };

  const randomShips = (size: number, ships: number): number[] => {
    console.log(`Placing ${ships} ships randomly on a ${size}x${size} board.`);
    let positions = new Set<number>();

    while (positions.size < ships) {
      const pos = Math.floor(Math.random() * size * size);
      if (!positions.has(pos)) {
        positions.add(pos);
      }
    }
    return Array.from(positions);
  };

  const attack = (row: number, col: number) => {
    console.log(`Attacking position: (${row}, ${col})`);
    if (row < 0 || row >= matrix.length || col < 0 || col >= matrix.length) {
      console.error("Attack position out of bounds");
      return;
    }
    const newMatrix = matrix.map((r) => r.slice());
    switch (newMatrix[row][col]) {
      case "-": {
        newMatrix[row][col] = "O"; // Miss
        break;
      }
      case "$": {
        newMatrix[row][col] = "X"; // Hit
        break;
      }
      case "O":
      case "X": {
        console.warn("Position already attacked");
        return;
      }
      default:
        console.error("Unknown cell state");
        return;
    }
    setMatrix(newMatrix);
    console.log("Updated board matrix after attack:", newMatrix);
  };
  return (
    <PageComponent>
      <SectionComponent>
        <h1 className="text-3xl font-bold mb-4 text-center items-center p-1 text-blue-700">Battleship Game!</h1>
      </SectionComponent>
      <ResizeComponent resize={resetBMatrix} />

      <SectionComponent>
        <CenterCardComponent id="matrix_of_square_1">
          <MatrixOfSquareComponent
            matrix={matrix}
            handleMatrixCellHit={attack}
          ></MatrixOfSquareComponent>
        </CenterCardComponent>
      </SectionComponent>

      <SectionComponent>
        <CenterCardComponent id={"input in cards"}>
          <LabelInputComponent
            labelData={{
              id: "l_input_1",
              htmlFor: "input_1",
              content: "input_1",
            }}
            inputData={{ id: "input_1", type: "text", value: "" }}
            onChange={(val) => {console.log(val)}}
          ></LabelInputComponent>
        </CenterCardComponent>
      </SectionComponent>
    </PageComponent>
  );
}
