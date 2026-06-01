class Ship {
  constructor(length, hitCount, sunkBool = false) {
    this.length = length;
    this.hitCount = hitCount;
    this.sunkBool = sunkBool;
  }
  hit() {
    this.hitCount++;
    return this.hitCount;
  }
  isSunk() {
    if (this.hitCount === this.length) this.sunkBool = true;
    return this.sunkBool;
  }
}
export { Ship };
