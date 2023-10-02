class Vertex {
  /** @param { Array } coordinates [x, y] */
  constructor( coordinates ){
    this.coordinates = coordinates;
    this.value = 1;
    this.isWall = false;
    this.isStart = false;
    this.isTarget = false;
    this.visited = false;
    this.explored = false;
    this.isShortestPath = false;
    this.previous = undefined;
  }
}

export const vertexSize = 24;

export default Vertex