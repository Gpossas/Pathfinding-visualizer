<script>
  import { dfs, bfs, dijkstra, aStar } from './pathfinding algorithms.js';
  import { visualizedAlgorithm } from './helpers/store.js';
  import { clearPath, clearWalls, clearWeights } from './helpers/board.js';
  import { randomizedPrims } from './maze_generators.js';
  import { speed } from './helpers/store.js';
    import { get } from 'svelte/store';

  export let startVertex;
  export let targetVertex;

  export let algorithm = '';

  function run( algorithm, isAnimated = true ){
    if ( isAnimated ) visualizedAlgorithm.set('');
    clearPath();
    switch ( algorithm ){
      case 'dfs': return dfs( startVertex );
      case 'bfs': return bfs( startVertex );
      case 'dijkstra': return dijkstra( startVertex );
      case 'a*': return aStar( startVertex, targetVertex );
    }  
  }

  function generateMaze(){
    clearPath();
    clearWalls();
    randomizedPrims( startVertex );
  }

  function clear( task ){
    switch ( task ){
      case 'path':
        visualizedAlgorithm.set(''); 
        clearPath();
        return;
      case 'walls':
        clearWalls();
        break;
      case 'weights':
        clearWeights();
        break;
    }
    
    if ( get(visualizedAlgorithm) ){
      run( algorithm, false );
    }
  }
</script>

<header>

  <h1>Pathfinding Visualizer</h1>
  <nav>
    <ul class="action_buttons">
      <li class="select">
        <button>Algorithms ⠀⠀⠀▼</button>
        <ul class="dropdown">
          <li>
            <button on:click={ () => algorithm = 'dfs' }>Depth-first search</button>
          </li>
          <li>
            <button on:click={ () => algorithm = 'bfs' }>Breadth-first search</button>
          </li>
          <li>
            <button on:click={ () => algorithm = 'dijkstra' }>Dijkstra's algorithm</button>
          </li>
          <li>
            <button on:click={ () => algorithm = 'a*' }>A* search algorithm</button>
          </li>
        </ul>
      </li>
      
      <li class="select">
        <button>Generate Maze ⠀⠀⠀▼</button>
        <ul class="dropdown">
          <li> <button on:click={ () => generateMaze() } type="submit">Randomized Prims</button> </li>
        </ul>
      </li>

      {#if algorithm }
        <li> <button on:click={ () => run( algorithm ) } type="submit" class="primaryButton">Visualize { algorithm }</button> </li>
      {:else }
        <li> <button disabled class="primaryButton">Choose an Algorithm</button> </li>
      {/if }

      <li> <button on:click={ () => clear( 'path' ) } type="submit">Clear Path</button> </li>
      
      <li> <button on:click={ () => clear( 'walls' ) } type="submit">Clear Walls</button> </li>

      <li> <button on:click={ () => clear( 'weights' ) } type="submit">Clear Weights</button> </li>

      <li class="speed"> 
        <label for="speed">fast</label> 
        <input type="range" name="speed" min="10" max="1000" bind:value={ $speed }> 
        <label for="speed">slow</label> 
      </li>
    </ul>
  </nav>
</header>

<style>

  header{
    background-color: var( --secondary );
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 100%;
    padding: 20px;
    gap: 20px 40px;
  }

  h1{
    color: white;
  }

  ul{
    display: flex;
    gap: 20px;
    padding: 0;
  }

  .action_buttons{
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  /* List items */

  .dropdown{
    border-top: 7px solid var( --secondary );

    width: 100%;
    background-color: var( --background );
    position: absolute;
    z-index: 999;
    display: none;
  }

  li .dropdown{
    padding: 5px;
    width: 100%; 
  }
  li:hover .dropdown{
    display: block;
  }

  .select{
    display: inline-block;
    position: relative; 
  }

  /* range input */
  .speed{
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    margin-bottom: 5px;
  }
  .speed input{
    width: 50px;
    accent-color: var( --primary );
  }
  .speed label{
    font-weight: 600;
    font-size: 12px;
    margin-top: 2px;
  }

  /* ===== BUTTONS ===== */

  button{
    padding: 10px 20px;
    color: white;
    font-weight: 600;
    font-size: 12px;
    background-color: var( --background );
    border: none;
    border-radius: 7px;
  }
  button:hover{
    cursor: pointer;
  }
  .dropdown button:hover{
    transition: 0.2s ease-in;
    background-color: var( --primary );
  }

  .primaryButton{
    background-color: var( --primary );
  }

  @media (692px < width < 975px) {
    .action_buttons li{
      flex-basis: 31%;
    }
  }
</style>