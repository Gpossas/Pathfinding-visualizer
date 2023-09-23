<script>
// @ts-nocheck

  /** @param { Event } mouseEvent */
   function drawOrRemoveWall( mouseEvent ){
    if ( !isPressing ) return;

    if ( mouseEvent.buttons == rightButton ){
      state = 'wall';
      vertex.isWall = true;
    } else{
      state = '';
      vertex.isWall = false;
    }
  }

  const rightButton = 1;

  export let rowIndex;
  export let columnIndex;
  export let isPressing;
  export let vertex;

  let state = '';
</script>

<div 
  on:mouseenter={ drawOrRemoveWall }
  class="vertex { state }"
  id="{ rowIndex }_{ columnIndex }" 
  role="cell" tabindex="-1" aria-label="vertex">
</div>

<style>
  .vertex{
    display: inline-block;
    border: 0.5px solid;
  }

  .wall{
    background-color: black;
  }
</style>