class Vertex {
  /** @param { number } id id */
  constructor( id ){
    this.coordinates = id;
    this.isWall = false;
    this.start = false;
    this.target = false;
    this.visited = false;
    this.explored = false;
    this.isShortestPath = false;
    this.previous = undefined;
  }
}

export const vertexSize = 24;

export default Vertex