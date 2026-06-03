import { Gameboard } from "./Gameboard.js";
class Player {
  constructor(name = "Player", type = "real", player_gameboard) {
    this.name = name;
    this.type = type;
    this.player_gameboard = new Gameboard();
  }
}
export { Player };
