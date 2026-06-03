import { Gameboard } from "./Gameboard.js";
import { Player } from "./Player.js";
import "./styles.css";

const content = document.getElementById("content");
const left = document.getElementById("left");
const right = document.getElementById("right");
const game_info = document.getElementById("game-info");

const startScreen = () => {
  const startScreen = document.createElement("div");
  const start_input1 = document.createElement("input");
  const start_input2 = document.createElement("input");
  const start_label1 = document.createElement("label");
  const play_button = document.createElement("button");

  startScreen.className = "start_screen";
  start_label1.className = "start_label1";
  start_input1.className = "start_input1";
  start_input2.className = "start_input2";
  play_button.className = "play_button";

  start_input1.placeholder = "Player";

  start_label1.textContent = "Player name";
  play_button.textContent = "PLAY";

  startScreen.appendChild(start_label1);
  startScreen.appendChild(start_input1);
  startScreen.appendChild(play_button);
  left.appendChild(startScreen);

  play_button.addEventListener("click", () => {
    const player1 = new Player(start_input1.value);
    const computer = new Player("Computer", "computer");
    left.replaceChildren();
    renderShipSelect(player1, computer);
    renderGameboard(player1, computer);
  });
};
const renderShipSelect = (player1, player2) => {
  const ships = [
    { name: "carrier", length: 5 },
    { name: "battleship", length: 4 },
    { name: "submarine", length: 3 },
    { name: "cruiser", length: 3 },
    { name: "destroyer", length: 2 },
  ];
  const shipSelectScreen = document.createElement("div");
  const position_button = document.createElement("button");
  const gameboard_squares = document.querySelectorAll(".render_square");
  position_button.id = "position_btn";
  shipSelectScreen.id = "shipSelectS";
  position_button.textContent = "Horizontal";
  position_button.setAttribute("position", "Horizontal");
  shipSelectScreen.classList = "ship_select_screen";
  ships.forEach((ship) => {
    const ship_row = document.createElement("div");
    ship_row.setAttribute("ship_name", ship.name);
    ship_row.setAttribute("ship_length", ship.length);
    ship_row.className = "ship";
    for (let index = 0; index < ship.length; index++) {
      const square = document.createElement("div");
      const tuxedo = document.createElement("img");
      tuxedo.src = "https://media.tenor.com/S61VCO73mOAAAAAj/linux-tux.gif";
      tuxedo.style.width = "15px";
      square.className = "ship_square";
      ship_row.appendChild(square);
      square.appendChild(tuxedo);
    }
    shipSelectScreen.appendChild(ship_row);
  });
  position_button.classList = "position_button";
  position_button.addEventListener("click", () => {
    if (position_button.textContent === "Horizontal") {
      position_button.textContent = "Vertical";
      position_button.setAttribute("position", "Vertical");
    } else {
      position_button.textContent = "Horizontal";
      position_button.setAttribute("position", "Horizontal");
    }
  });
  right.appendChild(shipSelectScreen);
  shipSelectScreen.appendChild(position_button);
};
const renderGameboard = (player1, player2) => {
  const ship_list = document.querySelectorAll(".ship");
  const shipSelectS = document.getElementById("shipSelectS");
  left.style.cssText = "display: flex; flexDirection: row";
  const gameboardScreen = document.createElement("div");
  gameboardScreen.className = "gameboard_screen";
  game_info.className = "game_info1";
  game_info.textContent = `Place your penguins, ${player1.name}!`;
  for (let i = 0; i < 10; i++) {
    const render_row = document.createElement("div");
    render_row.className = "render_row";
    for (let j = 0; j < 10; j++) {
      const render_square = document.createElement("div");
      const position_btn = document.getElementById("position_btn");
      render_square.className = "render_square";
      render_square.setAttribute("coordinates", [i, j]);
      render_row.appendChild(render_square);
      ship_list.forEach((ship) => {
        ship.addEventListener("click", () => {
          const shipName = ship.getAttribute("ship_name");
          render_square.addEventListener("click", () => {
            shipSelectS.removeChild(ship);
            const coord = render_square.getAttribute("coordinates");
            const coordinates = coord.split(",").map(Number);
            player1.player_gameboard.placeShip(
              coordinates,
              shipName,
              position_btn.getAttribute("position"),
            );
            left.replaceChildren();
            renderGameboard(player1, player2);
          });
        });
      });
      if (
        player1.player_gameboard.board[i][j] !== null &&
        player1.player_gameboard.board[i][j] !== false
      ) {
        const tuxedo = document.createElement("img");
        tuxedo.src = "https://media.tenor.com/S61VCO73mOAAAAAj/linux-tux.gif";
        tuxedo.style.width = "15px";
        render_square.appendChild(tuxedo);
        render_square.style.backgroundColor = "rgb(43, 43, 43)";
      }
    }
    gameboardScreen.appendChild(render_row);
  }

  left.appendChild(gameboardScreen);
};
startScreen();
