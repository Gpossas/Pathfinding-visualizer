<script>
  // @ts-nocheck
  import { get } from "svelte/store";
  import { rebuildPath } from "./helpers/store";
  import { dfs, bfs, dijkstra, aStar } from "./pathfinding algorithms";
  import { clearPath } from "./helpers/board";

  /** @param { Event } mouseEvent */
   function drawOrRemove( mouseEvent ){
    if ( !isPressing || vertex.isStart || vertex.isTarget ) return;
    
    const leftMouseButtonPressed = mouseEvent.buttons == 1 && startEvent.button == 0;

    if ( leftMouseButtonPressed ){
      vertex.isWall = !startEvent.shiftKey;
      vertex.value = startEvent.shiftKey ? 15 : 1;
    } else {
      vertex.isWall = false;
      vertex.value = 1;
    }
  }

  /** @param { Event } mouseEvent */
  function moveToPosition( mouseEvent ){
    if ( !isPressing ) return;

    const isStartVertex = startEvent.target.classList.contains( 'start' );

    if ( mouseEvent.type ===  'mouseenter' ){
      if ( isStartVertex ){
        vertex.isStart = true;
        startVertex = vertex;
      } else{
        vertex.isTarget = true;
        targetVertex = vertex;
      }

      retracePath();
    } else{
      isStartVertex ? vertex.isStart = false : vertex.isTarget = false;
    }
  }

  function retracePath(){
    clearPath();
    switch( get( rebuildPath ) ){
      case 'dfs': return dfs( startVertex );
      case 'bfs': return bfs( startVertex );
      case 'dijkstra': return dijkstra( startVertex );
      case 'a*': return aStar( startVertex, targetVertex );  
    }
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
  on:mouseenter={ drawOperation ? moveToPosition : drawOrRemove }
  on:mouseleave={ drawOperation ? moveToPosition : undefined }
  id="{ rowIndex }_{ columnIndex }" 
  class="vertex { vertex.value > 1 ? 'weighted':'' } { 
    vertex.isStart ? 'start':
    vertex.isTarget ? 'target':
    vertex.isWall ? 'wall':
    vertex.isShortestPath ? 'shortestPath':
    vertex.visited ? 'visited':
    vertex.explored ? 'explored':
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
    background-image: url("../assets/person.svg");
  }

  .target{
    background-image: url("../assets/target.svg");
  }

  .shortestPath{
    background-color: #efc12e;
  }

  .visited{
    background-color: var( --primary );
  }

  .explored{
    background-color: #e54d4d;
  }

  .weighted{
    background-image: url("../assets/weight.svg");
  }
</style>