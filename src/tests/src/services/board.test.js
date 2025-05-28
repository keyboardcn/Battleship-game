const assert = require("assert");
const { Board } = require("../../../src/app/services/board");

describe("Board", () => {
  let game;
  beforeEach(() => {
    game = new Board(10, 10);
    game.startGame();
  });

  it("should place 3 ships", () => {
    assert.strictEqual(game.ships.length, 3);
    const lengths = game.ships.map((s) => s.length).sort();
    assert.deepStrictEqual(lengths, [2, 3, 4]);
  });

  it("should update board and return hit when shooting at a ship", () => {
    const target = game.ships[0][0];
    const result = game.shoot(target[0], target[1]);
    assert.strictEqual(result.hit, true);
    assert.strictEqual(game.board[target[0]][target[1]], "X");
  });

  it("should return miss and update board when shooting at empty spot", () => {
    let emptyShot;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (!game.ships.some(ship => ship.some(([sr, sc]) => sr === r && sc === c))) {
          emptyShot = [r, c];
          break;
        }
      }
      if (emptyShot) break;
    }
    const result = game.shoot(emptyShot[0], emptyShot[1]);
    assert.strictEqual(result.hit, false);
    assert.strictEqual(game.board[emptyShot[0]][emptyShot[1]], "O");
  });

  it("should reduce remainingShips when a ship is sunk", () => {
    const ship = game.ships[0];
    ship.forEach(([r, c]) => game.shoot(r, c));
    assert.strictEqual(game.remainingShips, 2);
  });

  it("should return the correct number of hits and misses", () => {
    let ship = game.ships[0];
    game.shoot(ship[0][0], ship[0][1]); // 1 hit
    let miss;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (!game.ships.some(ship => ship.some(([sr, sc]) => sr === r && sc === c))) {
          miss = [r, c];
          break;
        }
      }
      if (miss) break;
    }
    game.shoot(miss[0], miss[1]);
    assert.strictEqual(game.hits, 1);
    assert.strictEqual(game.misses, 1);
  });
});
