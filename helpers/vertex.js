class Vertex {
  /**
   * @param { Array } coordinates [x, y]
   */
  constructor( coordinates ){
    self.coordinates = coordinates;
    self.isWall = false;
    self.start = false;
    self.target = false;
    self.visited = false;
    self.explored = false;
    self.isShortestPath = false;
    self.previous = undefined;
  }
}