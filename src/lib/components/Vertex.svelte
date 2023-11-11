<script>
  // @ts-nocheck
  import { get } from "svelte/store";
  import { isAlgorithmRunning, key, visualizedAlgorithm } from "../helpers/store";
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
    
    if ( get(visualizedAlgorithm) ){
      retracePath();
    }
  }

  /** @param { Event } mouseEvent */
  function moveToPosition( mouseEvent ){
    if ( !isPressing || get( isAlgorithmRunning ) ) return;

    const isStartVertex = startEvent.target.classList.contains( 'start' );
    const isTargetVertex = startEvent.target.classList.contains( 'target' );

    if ( mouseEvent.type ===  'mouseenter' ){
      
      if ( isStartVertex ){
        vertex.compute( 'isStart', true );
        startVertex = vertex;
      } else if ( isTargetVertex ){
        vertex.compute( 'isTarget', true );
        targetVertex = vertex;
      } else{
        vertex.compute( 'isKey', true );
        key.put( $vertex );
      }

      if ( get(visualizedAlgorithm) ){
        retracePath();
      }

    } else{

      if ( isStartVertex ){
        vertex.compute( 'isStart', false );
      }
      else if( isTargetVertex ){
        vertex.compute( 'isTarget', false );
      } else{
        vertex.compute( 'isKey', false );
      }
    }
  }

  function retracePath(){
    clearPath();
    key.found( false );
    switch( get( visualizedAlgorithm ) ){
      case 'dfs': return dfs( startVertex );
      case 'bfs': return bfs( startVertex );
      case 'dijkstra': return dijkstra( startVertex );
      case 'a*': aStar( get(startVertex), get(targetVertex) ); break;
    }
  }

  export let rowIndex;
  export let columnIndex;
  export let isPressing;
  export let vertex;
  export let cloneVertex;
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
    $vertex.isShortestPath || $cloneVertex.isShortestPath ? 'shortestPath':
    $vertex.visited ? 'visited':
    $cloneVertex.visited ? 'clone-visited': 
    $visualizedAlgorithm && ( $vertex.explored || $cloneVertex.explored ) ? 'explored':
    ''
  }
  { 
    $isAlgorithmRunning && $vertex.visited ? 'animate-grow': 
    $isAlgorithmRunning && $cloneVertex.visited ? 'animate-grow-clone': ''
  }
  { $isAlgorithmRunning && ( $vertex.isStart || $vertex.isTarget || $vertex.isKey ) ? 'disabled': '' }
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

  .clone-visited{
    background-color: hsl(231, 87%, 56%);
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

  @keyframes grow-clone {
    0% {
      transform: scale(0);
      border-radius: 50%;
      background-color: hsl(231, 87%, 36%);
    }  
    25%{
      background-color: hsl(231, 87%, 46%);
    }
    50%{
      background-color: hsl(231, 87%, 56%);
    }
    75%{
      background-color: hsl(231, 87%, 71%);
    }
    100% {
      transform: scale(1);
      background-color: hsl(231, 87%, 56%);
    }
  }

  .animate-grow{
    animation: grow 1.5s ease-out;
  }
  .animate-grow-clone{
    animation: grow-clone 1.5s ease-out;
  }
</style>