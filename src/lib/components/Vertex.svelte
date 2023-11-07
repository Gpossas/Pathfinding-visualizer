<script>
  // @ts-nocheck
  import { get } from "svelte/store";
  import { isAlgorithmRunning, visualizedAlgorithm } from "../helpers/store";
  import { dfs, bfs, dijkstra, aStar } from "../pathfinding algorithms";
  import { clearPath } from "../helpers/board";

  /** @param { Event } mouseEvent */
   function drawOrRemove( mouseEvent ){
    if ( !isPressing || $vertex.isStart || $vertex.isTarget || $vertex.isKey ){
      return;
    }
    
    const leftMouseButtonPressed = mouseEvent.buttons == 1 && startEvent.button == 0;

    if ( leftMouseButtonPressed ){
      vertex.compute( 'isWall', !startEvent.shiftKey );
      vertex.compute( 'value', startEvent.shiftKey ? 7 : 1 );
    } else {
      vertex.compute( 'isWall', false );
      vertex.compute( 'value', 1 );
    }
  }

  /** @param { Event } mouseEvent */
  function moveToPosition( mouseEvent ){
    if ( !isPressing || get( isAlgorithmRunning ) ) return;

    const isStartVertex = startEvent.target.classList.contains( 'start' );

    if ( mouseEvent.type ===  'mouseenter' ){
      
      if ( isStartVertex ){
        vertex.compute( 'isStart', true );
        startVertex = vertex;
      } else{
        vertex.compute( 'isTarget', true );
        targetVertex = vertex;
      }

      if ( get(visualizedAlgorithm) ){
        retracePath();
      }

    } else{

      if ( isStartVertex ){
        vertex.compute( 'isStart', false );
      }
      else{
        vertex.compute( 'isTarget', false );
      }
    }
  }

  function retracePath(){
    clearPath();
    switch( get( visualizedAlgorithm ) ){
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
  export let moveOperation;

  let vertexComponent;
</script>

{ #key isPressing && startEvent.target === vertexComponent }
<div 
  on:mouseenter={ moveOperation ? moveToPosition : drawOrRemove }
  on:mouseleave={ moveOperation ? moveToPosition : undefined }
  id="{ rowIndex }_{ columnIndex }" 
  class="vertex 
  { $vertex.value > 1 && !$vertex.isWall ? 'weighted':'' } 
  {
    $vertex.isStart ? 'start':
    $vertex.isTarget ? 'target': 
    $vertex.isKey ? 'key': '' 
   } 
  { 
    $vertex.isWall ? 'wall':
    $vertex.isShortestPath ? 'shortestPath':
    $vertex.visited ? 'visited':
    $vertex.explored && get(visualizedAlgorithm) ? 'explored':
    ''
  }
  { $isAlgorithmRunning && $vertex.visited ? 'animate-grow': '' }
  { $isAlgorithmRunning && ( $vertex.isStart || $vertex.isTarget ) ? 'disabled':'' }
  "
  bind:this={ vertexComponent }
  role="cell" tabindex="-1" aria-label="vertex">
</div>
{ /key }

<style>
  .vertex{
    display: inline-block;
    /* Prevent double borders in CSS Grid */
    border-bottom: 0.1px solid var( --secondary );
    border-right: 0.1px solid var( --secondary );
  }

  .wall{
    background-color: var( --secondary );
    animation: build 0.1s cubic-bezier(.26,.53,.74,1.48);
  }

  .start{
    background-image: url("../assets/person.svg");
  }
  .start:hover{
    filter: brightness(1.3);
  }

  .target{
    background-image: url("../assets/target.svg");
  }
  .target:hover{
    filter: brightness(1.8);
  }

  .key{
    background-image: url("../assets/key_of_light.svg");
  }
  .key:hover{
    filter: brightness(1.8);
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
    animation: fall 0.3s cubic-bezier(.26,.53,.74,1.28);
  }

  .disabled{
    cursor: not-allowed;
  }

  @keyframes build {
    from {
      transform: scale(0, 0);
    }
    to {
      transform: scale(1, 1);
    }
  }

  @keyframes fall {
    from {
      transform: translate(0, -30px);
    }
    to {
      transform: translate(0, 0);
    }
  }

  @keyframes grow {
    0% {
      transform: scale(0);
      border-radius: 50%;
      background-color: #F5332A;
    }  
    25%{
      background-color: #F5332A;
    }
    50%{
      background-color: var( --primary );
    }
    75%{
      background-color: #F1C32F;
    }
    100% {
      transform: scale(1);
      background-color: var( --primary );
    }
  }

  .animate-grow{
    animation: grow 1.5s ease-out;
  }
</style>