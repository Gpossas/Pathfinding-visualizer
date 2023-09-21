<script>
  /** @param { Event } e */
   function drawOrRemoveWall( e ){
     if (!isPressing) return;
     console.log(e.target);
    
    if ( vertex.isWall ){
      state = '';
      vertex.isWall = false;
    } else{
      state = 'wall';
      vertex.isWall = true;
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