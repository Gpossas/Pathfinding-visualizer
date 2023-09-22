<script>
// @ts-nocheck

  import VertexComponent from "./lib/Vertex.svelte";
  import { createBoard, rows, columns } from "./helpers/board.js"
  import { vertexSize } from "./helpers/vertex.js"

  const graph = createBoard( rows, columns );
  const leftButton = 0

  /** @param { Event } e */
  function startSelecting( e ){
    isPressing = true;
    const vertex = graph[e.target.id];
    
    if ( e.button == leftButton ){
      e.target.classList.add( 'wall' )
      vertex.isWall = true;
    } else{
      e.target.classList.remove( 'wall' )
      vertex.isWall = false;
    }
  }
  /** @param { Event } e */
  function stopSelecting( e ){
    isPressing = false;
  }

  let isPressing = false;
</script>

<div class="container" >
  <div 
    on:mousedown|preventDefault={ startSelecting } on:mouseup={ stopSelecting }
    id="board" 
    style="grid-template-rows: repeat({ rows }, { vertexSize }px); 
    grid-template-columns: repeat({ columns }, { vertexSize }px);" 
    role="grid" tabindex="-1" aria-label="Board"
      >
    { #each graph as vertex, id ( id ) }
      <VertexComponent { vertex } { isPressing } { id } />
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
