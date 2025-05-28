const assert = require("assert");
const { OnePlayerGame } = require("../../src/services/games");

describe("OnePlayerGame", () => {
    let game;
    beforeEach(() => {
        game = new OnePlayerGame("Player1", 10, 10);
    });

    it("should create board for player", () => {
        assert.strictEqual(game.player1.board.board.length, 10);
        assert.strictEqual(game.player1.board.board[0].length, 10);
    });
})