// types/index.ts — your domain class
export class Room {
  width: number;
  height: number;
  depth: number;

  constructor(width: number = 10, height: number = 5, depth: number = 10) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  volume() {
    return this.width * this.height * this.depth;
  }

  isValid() {
    return this.width > 0 && this.height > 0 && this.depth > 0;
  }
}
