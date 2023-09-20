<script>
  import VertexComponent from "./lib/Vertex.svelte";
  import { createBoard, rows, columns } from "./helpers/board.js"
  import { vertexSize } from "./helpers/vertex.js"

  const graph = createBoard( rows, columns );

  let isPressing = false;
  /**
   * @param { Event } e
   */
  function addOrRemoveWall(e){
    console.log('pressing...')
    isPressing = true;
  }
  
  function stopSelecting(e){
    console.log('stop pressing');
    isPressing = false;
  }
</script>

<div class="container">
  <div 
    on:mousedown|preventDefault={addOrRemoveWall} on:mouseup={stopSelecting}
    id="board" 
    style="grid-template-rows: repeat({ rows }, { vertexSize }px); 
    grid-template-columns: repeat({ columns }, { vertexSize }px);" 
    role="grid" tabindex="-1" aria-label="Board"
      >
    {#each graph as line, row }
      {#each line as vertex, column }
        <VertexComponent {isPressing} { row } {column} />
      {/each}
    {/each}
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
