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
  placeShip([i, j], ship, position) {
    if (ship === "carrier") ship = this.carrier;
    if (ship === "battleship") ship = this.battleship;
    if (ship === "cruiser") ship = this.cruiser;
    if (ship === "submarine") ship = this.submarine;
    if (ship === "destroyer") ship = this.destroyer;

    if (position === "Horizontal") position = true;
    else position = false;
    let count = 0;
    for (let index = 0; index < ship.length; index++) {
      if (position) {
        if (j + index >= 10 || this.board[i][j + index] !== null) return false;
      } else {
        if (i + index >= 10 || this.board[i + index][j] !== null) return false;
      }
    }
    while (count !== ship.length) {
      if (position) {
        this.board[i][j + count] = ship;
      } else {
        this.board[i + count][j] = ship;
      }
      count++;
    }
    return true;
  }
  receiveAttack([i, j]) {
    const randomZeroNine = () => {
      return Math.floor(Math.random() * 10);
    };
    while (this.board[i][j] === "x") {
      i = randomZeroNine();
      j = randomZeroNine();
    }
    if (this.board[i][j] !== null && this.board[i][j] !== false) {
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
