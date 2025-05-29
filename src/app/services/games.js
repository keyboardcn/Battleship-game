
const { Board } = require('./board');
class AbstractGame {
  gameStats() {}
  alternativeShoot() {}
}

export class TwoPlayerGame extends AbstractGame {
  constructor(name1, name2, n, m) {
    super();
    this.player1 = { name: name1, board: new Board(n, m), turns: 0, hits: 0, misses: 0 };
    this.player1.board.startGame();
    this.player2 = { name: name2, board: new Board(n, m), turns: 0, hits: 0, misses: 0 };
    this.player2.board.startGame();
    this.currentTurn = 1;
    this.winner = null;
  }

  gameStats() {
    return {
      [this.player1.name]: {
        turns: this.player1.turns,
        hits: this.player1.hits,
        misses: this.player1.misses,
      },
      [this.player2.name]: {
        turns: this.player2.turns,
        hits: this.player2.hits,
        misses: this.player2.misses,
      },
    };
  }

  alternativeShoot(row, col) {
    if (this.winner) return { winner: this.winner };

    let shooter = this.currentTurn === 1 ? this.player1 : this.player2;
    let opponent = this.currentTurn === 1 ? this.player2 : this.player1;

    const result = opponent.board.shoot(row, col);
    shooter.turns++;
    if (result.hit) shooter.hits++;
    else shooter.misses++;

    if (result.remainingShips === 0) this.winner = shooter.name;

    this.currentTurn = this.currentTurn === 1 ? 2 : 1;
    return {
      shooter: shooter.name,
      ...result,
      winner: this.winner,
      boards: {
        [this.player1.name]: this.player1.board.board,
        [this.player2.name]: this.player2.board.board,
      }
    };
  }
}

export class OnePlayerGame extends AbstractGame {
  constructor(name, n, m) {
    super();
    this.player = { name: name, board: new Board(n, m), turns: 0, hits: 0, misses: 0 };
    this.player.board.startGame();
    this.winner = null;
  }

  gameStats() {
    return {
      [this.player.name]: {
        turns: this.player.turns,
        hits: this.player.hits,
        misses: this.player.misses,
      }
    };
  }

  alternativeShoot(row, col) {
    console.log(`Shooting at (${row}, ${col}) for player ${this.player.name}`);
    
    if (this.winner) return { winner: this.player.name };

    const result = this.player.board.shoot(row, col);
    this.player.turns++;
    if (result.hit) this.player.hits++;
    else this.player.misses++;

    if (result.remainingShips === 0) this.winner = this.player.name;

    return {
      shooter: this.player.name,
      ...result,
      winner: this.winner,
      board: this.player.board.board
    };
  }
}

