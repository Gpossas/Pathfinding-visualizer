class Vertex {
  /**
   * @param { Array } coordinates [x, y]
   */
  constructor( coordinates ){
    this.coordinates = coordinates;
    this.isWall = false;
    this.start = false;
    this.target = false;
    this.visited = false;
    this.explored = false;
    this.isShortestPath = false;
    this.previous = undefined;
  }
}

export default Vertex