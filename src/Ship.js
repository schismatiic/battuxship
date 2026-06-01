class Ship {
  constructor(length, hitCount, sunkBool) {
    this.length = length;
    this.hitCount = hitCount;
    this.sunkBool = sunkBool;
  }
  hit() {
    this.hitCount++;
    return this.hitCount;
  }
  isSunk() {
    if (this.hitCount === this.length) return true;
    else return false;
  }
}
