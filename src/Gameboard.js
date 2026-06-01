import { Ship } from "./Ship.js";
class Gameboard {
  constructor(board, destroyer, submarine, cruiser, battleship, carrier) {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.destroyer = new Ship(2);
    this.submarine = new Ship(3);
    this.cruiser = new Ship(3);
    this.battleship = new Ship(4);
    this.carrier = new Ship(5);
  }
  placeShip([i, j], ship, horizontal = true) {
    let count = 0;
    while (count !== ship.length) {
      if (horizontal) {
        this.board[i + count][j] = ship;
      } else {
        this.board[i][j + count] = ship;
      }
      count++;
    }
  }
  receiveAttack([i, j]) {
    if (this.board[i][j] !== null) {
      this.board[i][j].hit();
      this.board[i][j] = "x";
    } else this.board[i][j] = false;
  }
  allSunk() {
    const sunkArr = [];
    sunkArr.push(this.destroyer.isSunk());
    sunkArr.push(this.submarine.isSunk());
    sunkArr.push(this.cruiser.isSunk());
    sunkArr.push(this.battleship.isSunk());
    sunkArr.push(this.carrier.isSunk());
    if (sunkArr.includes(false)) return false;
    else return true;
  }
}
export { Gameboard };
