<script>
// @ts-nocheck

  import VertexComponent from "./lib/Vertex.svelte";
  import { createBoard, rows, columns } from "./helpers/board.js"
  import { vertexSize } from "./helpers/vertex.js"

  const graph = createBoard( rows, columns );
  const leftButton = 0;
  
  let isPressing = false;

  /** @param { Event } mouseEvent */
  function startSelecting( mouseEvent ){
    isPressing = true;
    const [ row, column ] = mouseEvent.target.id.split('_');
    const vertex = graph[row][column];

    if ( mouseEvent.button == leftButton ){
      mouseEvent.target.classList.add( 'wall' );
      vertex.isWall = true;
    } else{
      mouseEvent.target.classList.remove( 'wall' );
      vertex.isWall = false;
    }
  }

  function stopSelecting(){
    isPressing = false;
  }
</script>

<div class="container" on:contextmenu={ ( popup ) => popup.preventDefault() } role="main" tabindex="-1" aria-label="Board container">
  <div 
    on:mousedown|preventDefault={ startSelecting } on:mouseup={ stopSelecting }
    id="board" 
    style="grid-template-rows: repeat({ rows }, { vertexSize }px); 
    grid-template-columns: repeat({ columns }, { vertexSize }px);" 
    role="grid" tabindex="-1" aria-label="Board"
    >
    { #each graph as row, rowIndex }
      { #each row as vertex, columnIndex }
        <VertexComponent { vertex } { isPressing } { rowIndex } { columnIndex } />
      { /each}
    { /each }
  </div>
</div>

<style>
  #board{
  display: grid;
}

.container{
  margin: 10px;
  display: grid;
  justify-content: center;
  align-items: center;
}
</style>
