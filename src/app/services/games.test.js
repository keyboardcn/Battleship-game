const assert = require("assert");
import { OnePlayerGame } from "./games";

describe("OnePlayerGame", () => {
    let game;
    beforeEach(() => {
        game = new OnePlayerGame("Player1", 10, 10);
    });

    it("should create board for player", () => {
        assert.strictEqual(game.player.board.board.length, 10);
        assert.strictEqual(game.player.board.board[0].length, 10);
    });
})