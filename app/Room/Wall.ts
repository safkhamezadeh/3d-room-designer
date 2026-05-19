export class Wall {
  width: number;
  height: number;
  depth: number;
  color: string;

  constructor(
    width: number,
    height: number,
    depth: number,
    color: string = "#FAE3E6",
  ) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
  }
}
