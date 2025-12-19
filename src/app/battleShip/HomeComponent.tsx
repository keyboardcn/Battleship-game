import React, {useState} from 'react';
import './HomeComponent.css';
import SetupComponent from './SetupComponent';
import MatrixComponent from './MatrixComponent';

export default function HomeComponent() {
  const [action, setAction] = useState("Start");
  const [matrix, setMatrix] = 
    useState([['$', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]);
  const resetBMatrix = (size) => {
    console.log(`Resetting board with size: ${size}`);
    setAction('Reset');
    const newMatrix = Array.from({ length:size}, () => Array(size).fill('-'));
    //TODO: Randomly place ships on the board
    newMatrix[0][0] = '$';

    setMatrix(newMatrix);
    console.log("New board matrix:", newMatrix);
  };

  const attack = (row, col) => {
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
      <SetupComponent action={action} resetBMatrix={resetBMatrix} />
      <MatrixComponent matrix={matrix} attack={attack} />
    </div>
  );
}