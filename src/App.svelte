<script>
  import VertexComponent from "./lib/Vertex.svelte";
  import { createBoard, rows, columns } from "./helpers/board.js"
  import { vertexSize } from "./helpers/vertex.js"

  const graph = createBoard( rows, columns );
</script>

<div class="container">
  <div 
    id="board" 
    style="grid-template-rows: repeat({ rows }, { vertexSize }px); 
      grid-template-columns: repeat({ columns }, { vertexSize }px);" 
    >
    {#each graph as line, row }
      {#each line as vertex, column }
        <VertexComponent { row } {column} />
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
