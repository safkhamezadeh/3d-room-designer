import { Wall } from "./Wall";

export class Room {
  width: number;
  height: number;
  depth: number;
  front: Wall;
  back: Wall;
  left: Wall;
  right: Wall;
  floor: Wall;
  ceiling: Wall;

  constructor(width = 10, height = 5, depth = 10) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.front = new Wall(width, height, 0.1, "#7A759C");
    this.back = new Wall(width, height, 0.1, "#9EC387");
    this.left = new Wall(depth, height, 0.1, "#0F1AFB");
    this.right = new Wall(depth, height, 0.1, "#52AAA7");
    this.floor = new Wall(width, depth, 0.1, "#8D1FC0");
    this.ceiling = new Wall(width, depth, 0.1, "#D93F51");
  }

  resize(width: number, height: number, depth: number) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.front.resize(width, height, 0.1);
    this.back.resize(width, height, 0.1);
    this.left.resize(depth, height, 0.1);
    this.right.resize(depth, height, 0.1);
    this.floor.resize(width, depth, 0.1);
    this.ceiling.resize(width, depth, 0.1);
  }
}
