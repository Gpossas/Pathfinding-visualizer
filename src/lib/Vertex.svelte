<script>
// @ts-nocheck

  /** @param { Event } mouseEvent */
   function drawOrRemoveWall( mouseEvent ){
    if ( !isPressing ) return;
    
    if ( mouseEvent.buttons == 1 && startEvent.button == 0 ){
      state = 'wall';
      vertex.isWall = true;
    } else{
      state = '';
      vertex.isWall = false;
    }
  }


  export let rowIndex;
  export let columnIndex;
  export let isPressing;
  export let vertex;
  export let startEvent;

  let state = '';
  let vertexComponent;
</script>

{ #key isPressing && startEvent.target === vertexComponent }
<div 
  on:mouseenter={ drawOrRemoveWall }
  id="{ rowIndex }_{ columnIndex }" 
  class="vertex { state } { vertex.isStart ? 'start':'' }"
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