import { Gameboard } from "../src/Gameboard.js";

describe("Gameboard", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("creates a 10x10 board", () => {
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
  });

  test("starts with empty coordinates", () => {
    expect(gameboard.board[0][0]).toBe(null);
    expect(gameboard.board[9][9]).toBe(null);
  });

  test("places a ship horizontally by default", () => {
    gameboard.placeShip([0, 0], gameboard.destroyer);
    expect(gameboard.board[0][0]).toBe(gameboard.destroyer);
    expect(gameboard.board[1][0]).toBe(gameboard.destroyer);
  });

  test("places a ship vertically when horizontal is false", () => {
    gameboard.placeShip([0, 0], gameboard.destroyer, false);
    expect(gameboard.board[0][0]).toBe(gameboard.destroyer);
    expect(gameboard.board[0][1]).toBe(gameboard.destroyer);
  });

  test("receiveAttack sends hit to the attacked ship", () => {
    gameboard.placeShip([0, 0], gameboard.destroyer);
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.destroyer.hitCount).toBe(1);
  });

  test("receiveAttack marks a hit coordinate with x", () => {
    gameboard.placeShip([0, 0], gameboard.destroyer);
    gameboard.receiveAttack([0, 0]);

    expect(gameboard.board[0][0]).toBe("x");
  });

  test("receiveAttack records a missed attack as false", () => {
    gameboard.receiveAttack([5, 5]);
    expect(gameboard.board[5][5]).toBe(false);
  });

  test("allSunk returns false when not all ships are sunk", () => {
    expect(gameboard.allSunk()).toBe(false);
  });

  test("allSunk returns true when all ships are sunk", () => {
    for (let i = 0; i < 2; i++) gameboard.destroyer.hit();
    for (let i = 0; i < 3; i++) gameboard.submarine.hit();
    for (let i = 0; i < 3; i++) gameboard.cruiser.hit();
    for (let i = 0; i < 4; i++) gameboard.battleship.hit();
    for (let i = 0; i < 5; i++) gameboard.carrier.hit();
    expect(gameboard.allSunk()).toBe(true);
  });
});
