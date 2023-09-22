<script>
// @ts-nocheck

  const rightButton = 1
  /** @param { Event } e */
   function drawOrRemoveWall( e ){
    if ( !isPressing ) return;

    if ( e.buttons == rightButton ){
      state = 'wall';
      vertex.isWall = true;
    } else{
      state = '';
      vertex.isWall = false;
    }
  }

  export let id;
  export let isPressing;
  export let vertex;

  let state = '';
</script>

<div 
  on:mouseenter={ drawOrRemoveWall }
  class="vertex { state }"
  id="{ id }" 
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