<script>
// @ts-nocheck

  /** @param { Event } mouseEvent */
   function drawOrRemoveWall( mouseEvent ){
    if ( !isPressing || vertex.isStart || vertex.isTarget ) return;
    
    if ( mouseEvent.buttons == 1 && startEvent.button == 0 ){
      vertex.isWall = true;
    } else{
      vertex.isWall = false;
    }
  }

  /** @param { Event } mouseEvent */
  function moveToPosition( mouseEvent ){
    if ( !isPressing ) return;
    
    const isStartVertex = startEvent.target.classList.contains( 'start' );

    if ( mouseEvent.type === 'mouseleave' ){
      isStartVertex ? vertex.isStart = false : vertex.isTarget = false;
    } else if ( isStartVertex ){
      vertex.isStart = true;
      startVertex = vertex;
    } else{
      vertex.isTarget = true;
      targetVertex = vertex;
    }
    if ( vertex.isWall ) 
      vertex.isWall = false;
  }

  export let rowIndex;
  export let columnIndex;
  export let isPressing;
  export let vertex;
  export let startEvent;
  export let startVertex;
  export let targetVertex;
  export let drawOperation;

  let vertexComponent;
</script>

{ #key isPressing && startEvent.target === vertexComponent }
<div 
  on:mouseenter={ drawOperation ? moveToPosition : drawOrRemoveWall }
  on:mouseleave={ drawOperation ? moveToPosition : undefined }
  id="{ rowIndex }_{ columnIndex }" 
  class="vertex { 
    vertex.isStart ? 'start':
    vertex.isTarget ? 'target':
    vertex.isWall ? 'wall':
    ''
  }"
  bind:this={ vertexComponent }
  role="cell" tabindex="-1" aria-label="vertex">
</div>
{ /key }

<style>
  .vertex{
    display: inline-block;
    border: 0.5px solid;
  }

  .wall{
    background-color: black;
  }

  .start{
    background-color: hsl(155, 100%, 31%);
  }

  .target{
    background-color: hsl(0, 100%, 40%);
  }
</style>