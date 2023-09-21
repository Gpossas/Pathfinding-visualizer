<script>
  /** @param { Event } e */
   function selectItems( e ){
    console.log( e.target );
  }

  export let row;
  export let column;
  export let isPressing;
</script>

{ #if isPressing }
  <div class="vertex" on:mouseenter|once={ selectItems } 
    id="row:{ row } column:{ column }" 
    role="cell" tabindex="-1" aria-label="vertex">
  </div>
{ :else }
  <div class="vertex" id="row:{ row } column:{ column }"></div>
{ /if }

<style>
  .vertex{
    display: inline-block;
    border: 0.5px solid;
  }
</style>