<script>
  import VertexComponent from "./lib/Vertex.svelte";
  import { createBoard, rows, columns } from "./helpers/board.js"
  import { vertexSize } from "./helpers/vertex.js"

  const graph = createBoard( rows, columns );

  /** @param { Event } e */
  function startSelecting( e ){
    console.log('pressing...')
    isPressing = true;
  }
  /** @param { Event } e */
  function stopSelecting( e ){
    console.log('stop pressing');
    isPressing = false;
  }

  let isPressing = false;
</script>

<div class="container">
  <div 
    on:mousedown|preventDefault={ startSelecting } on:mouseup={ stopSelecting }
    id="board" 
    style="grid-template-rows: repeat({ rows }, { vertexSize }px); 
    grid-template-columns: repeat({ columns }, { vertexSize }px);" 
    role="grid" tabindex="-1" aria-label="Board"
      >
    { #each graph as line, row }
      { #each line as vertex, column }
        <VertexComponent { isPressing } { row } {column} />
      { /each }
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
