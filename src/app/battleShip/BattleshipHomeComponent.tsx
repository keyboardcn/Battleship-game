import React, {useState} from 'react';
import './BattleshipHomeComponent.css';
import MatrixComponent from './MatrixComponent';
import ResizeComponent from './ResizeComponent';

export default function BattleshipHomeComponent() {
  const [action, setAction] = useState("Start");
  const [matrix, setMatrix] = 
    useState([['$', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]);
  
  const resetBMatrix = (size: number, ships: number) => {
    console.log(`Resetting board with size: ${size} and ships: ${ships}`);
    const newMatrix: string[][] = Array.from({ length:size}, () => Array(size).fill('-'));
    
    const positions = randomShips(size, ships);
    positions.forEach((pos) => {
      const row = Math.floor(pos / size);
      const col = pos % size;
      newMatrix[row][col] = '$'; // Place ship
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
  }

  const attack = (row: number, col: number) => {
    console.log(`Attacking position: (${row}, ${col})`);
    if (row < 0 || row >= matrix.length || col < 0 || col >= matrix.length) {
      console.error("Attack position out of bounds");
      return;
    }
    const newMatrix = matrix.map((r) => r.slice());
    switch (newMatrix[row][col]) {
      case '-':
        {
          newMatrix[row][col] = 'O'; // Miss
          break;
        }
      case '$':
        {
          newMatrix[row][col] = 'X'; // Hit
          break;
        }
      case 'O':
      case 'X':
        {
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
    <div className="container-wrapper">
      <h1>Welcome to the Battleship Game!</h1>
      <ResizeComponent resize={resetBMatrix} />
      <MatrixComponent matrix={matrix} attack={attack} />
    </div>
  );
}