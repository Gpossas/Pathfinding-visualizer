<script>
// @ts-nocheck

  /** @param { Event } mouseEvent */
   function drawOrRemoveWall( mouseEvent ){
    if ( !isPressing || vertex.isStart ) return;
    
    if ( mouseEvent.buttons == 1 && startEvent.button == 0 ){
      vertex.isWall = true;
    } else{
      vertex.isWall = false;
    }
  }

  export let rowIndex;
  export let columnIndex;
  export let isPressing;
  export let vertex;
  export let startEvent;

  let vertexComponent;
</script>

{ #key isPressing && startEvent.target === vertexComponent }
<div 
  on:mouseenter={ drawOrRemoveWall }
  id="{ rowIndex }_{ columnIndex }" 
  class="vertex { 
    vertex.isStart ? 'start':
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
</style>