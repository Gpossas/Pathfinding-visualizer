class Vertex {
  /** @param { Array } coordinates [x, y] */
  constructor( coordinates ){
    this.coordinates = coordinates;
    this.value = 1;
    this.isWall = false;
    this.isStart = false;
    this.isTarget = false;
    this.isKey = false;
    this.visited = false;
    this.explored = false;
    this.isShortestPath = false;
    this.previous = null;
    this.f = Infinity;
    this.g = Infinity;
  }
}

export const vertexSize = 24;

export default Vertex