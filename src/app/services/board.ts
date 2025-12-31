export class Board {
  rows: number;
  cols: number;
  board: string[][];
  ships: number[][][];
  shipLengths: number[];
  hits: number;
  misses: number;
  remainingShips: number;

  constructor(n: number, m: number) {
    this.rows = n;
    this.cols = m;
    this.board = Array.from({ length: n }, () => Array(m).fill("-"));
    this.ships = [];
    this.shipLengths = [2, 3, 4];
    this.hits = 0;
    this.misses = 0;
    this.remainingShips = 3;
  }

  startGame() {
    this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill("-"));
    this.ships = [];
    this.hits = 0;
    this.misses = 0;
    this.remainingShips = 3;
    for (let len of this.shipLengths) {
      let placed = false;
      while (!placed) {
        const isHorizontal = Math.random() < 0.5;
        const row = Math.floor(Math.random() * (isHorizontal ? this.rows : this.rows - len + 1));
        const col = Math.floor(Math.random() * (isHorizontal ? this.cols - len + 1 : this.cols));

        let newShip = [];
        for (let i = 0; i < len; i++) {
          const r = isHorizontal ? row : row + i;
          const c = isHorizontal ? col + i : col;
          if (this.board[r][c] !== "-") break;
          newShip.push([r, c]);
        }

        if (newShip.length === len) {
          for (let [r, c] of newShip) {
            this.board[r][c] = "S";
          }
          this.ships.push(newShip);
          placed = true;
        }
      }
    }
  }

  shoot(row, col) {

    let hit = false;
    let shipSunk = false;
    const newBoard = this.board.map(r => [...r]);
    
    if (newBoard[row][col] === "S") {
      newBoard[row][col] = "X";
      this.hits++;
      hit = true;
    } else if (newBoard[row][col] === "-") {
      newBoard[row][col] = "O";
      this.misses++;
    }

    for (let i = 0; i < this.ships.length; i++) {
      let ship = this.ships[i];
      if (ship.every(([r, c]) => newBoard[r][c] === "X")) {
        shipSunk = true;
        this.ships.splice(i, 1);
        this.remainingShips--;
        break;
      }
    }
    this.board = newBoard.map(row => [...row]);
    return {
      hit,
      misses: this.misses,
      hits: this.hits,
      remainingShips: this.remainingShips,
      ships: this.ships,
      board: newBoard.map(row => [...row])
    };
  }
}
