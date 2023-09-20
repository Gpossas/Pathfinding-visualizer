<script>
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

  export let row;
  export let column;

</script>

<div class="vertex" id="row:{row} column:{column}"></div>

<style>
  .vertex{
    display: inline-block;
    border: 0.5px solid;
  }
</style>