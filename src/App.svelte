<script>
// @ts-nocheck

  import VertexComponent from "./lib/Vertex.svelte";
  import { createBoard, rows, columns } from "./helpers/board.js"
  import { vertexSize } from "./helpers/vertex.js"

  const graph = createBoard( rows, columns );  
  const startVertex = graph[Math.trunc( rows / 2 )][1];
  startVertex.isStart = true;

  let isPressing = false;
  let startEvent;

  /** @param { Event } mouseEvent */
  function startSelecting( mouseEvent ){
    isPressing = true;
    startEvent = mouseEvent;
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
        <VertexComponent { vertex } { startEvent } { isPressing } { rowIndex } { columnIndex } />
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
