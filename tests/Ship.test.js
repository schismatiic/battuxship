import { Ship } from "../src/Ship.js";

describe("Ship", () => {
  test("should create a ship with the specified length", () => {
    const ship = new Ship(3, 0);
    expect(ship.length).toBe(3);
  });

  test("should initialize hit count correctly", () => {
    const ship = new Ship(3, 0);
    expect(ship.hitCount).toBe(0);
  });

  test("should initialize sunk status as false by default", () => {
    const ship = new Ship(3, 0);
    expect(ship.sunkBool).toBe(false);
  });

  test("should increase hit count by one when hit() is called", () => {
    const ship = new Ship(3, 0);
    ship.hit();
    expect(ship.hitCount).toBe(1);
  });

  test("should return the updated hit count after hit() is called", () => {
    const ship = new Ship(3, 0);
    expect(ship.hit()).toBe(1);
  });

  test("should return false when hit count is less than ship length", () => {
    const ship = new Ship(3, 2);
    expect(ship.isSunk()).toBe(false);
  });

  test("should return true when hit count equals ship length", () => {
    const ship = new Ship(3, 3);
    expect(ship.isSunk()).toBe(true);
  });

  test("should set sunkBool to true when hit count equals ship length", () => {
    const ship = new Ship(3, 3);
    ship.isSunk();
    expect(ship.sunkBool).toBe(true);
  });

  test("should return true after enough hits have been registered", () => {
    const ship = new Ship(2, 0);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("should return false for a newly created undamaged ship", () => {
    const ship = new Ship(4, 0);
    expect(ship.isSunk()).toBe(false);
  });
});
