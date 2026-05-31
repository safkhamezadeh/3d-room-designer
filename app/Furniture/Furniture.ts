export class Furniture {
  id = crypto.randomUUID();
  modelUrl: string | null;

  constructor(
    public position: [number, number, number],
    public width = 1,
    public height = 1,
    public depth = 1,
    public color = "#888888",
    modelUrl: string | null = null,
  ) {
    this.modelUrl = modelUrl;
  }
}
