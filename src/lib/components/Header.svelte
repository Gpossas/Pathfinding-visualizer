<script>
  import { dfs, bfs, dijkstra, aStar } from '../pathfinding algorithms.js';
  import { visualizedAlgorithm, isAlgorithmRunning } from '../helpers/store.js';
  import { clearPath, clearWalls, clearWeights } from '../helpers/board.js';
  import { randomizedPrims } from '../maze_generators.js';
  import { rows, columns } from '../helpers/board.js';
  import { speed, graph, key } from '../helpers/store.js';
  import { get } from 'svelte/store';

  export let startVertex;
  export let targetVertex;

  export let algorithm = '';

  async function run( algorithm, isAnimated = true ){
    if ( isAnimated ) visualizedAlgorithm.set('');
    clearPath();
    key.found( false );
    isAlgorithmRunning.set( true );

    switch ( algorithm ){
      case 'dfs': await dfs( startVertex ); break;
      case 'bfs': await bfs( startVertex ); break;
      case 'dijkstra': await dijkstra( startVertex ); break;
      case 'a*': await aStar( get(startVertex), get(targetVertex) ); break;
    }  

    isAlgorithmRunning.set( false );
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
    
    if ( get(visualizedAlgorithm) )
      run( algorithm, false );
  }

  function addKey(){
    const keyVertex = graph[Math.trunc( rows / 2 )][Math.trunc( columns / 2 )];
    key.put( get( keyVertex ) );
    keyVertex.compute( 'isKey' );

    if ( get(visualizedAlgorithm) ) run( algorithm, false );
  }

  function removeKey(){
    const [row, column] = get(key).vertex.coordinates;
    key.remove();
    graph[row][column].compute( 'isKey', false );
    
    if ( get(visualizedAlgorithm) ) run( algorithm, false );
  }
</script>

<header>

  <h1>Pathfinding Visualizer</h1>
  <nav>
    <ul class="action_buttons">
      <li class="select">
        <button>Algorithms ⠀▼</button>
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
        <button>Generate Maze ⠀▼</button>
        <ul class="dropdown">
          <li> <button on:click={ () => generateMaze() } type="submit">Randomized Prims</button> </li>
        </ul>
      </li>

      { #if $isAlgorithmRunning }
        { #if $key.vertex }
          <li> <button disabled>Remove key</button> </li>
        { :else }
          <li> <button disabled>Add key</button> </li>
        { /if }
      { :else}
        { #if $key.vertex }
          <li> <button on:click={ () => removeKey() } type="submit">Remove key</button> </li>
        { :else }
          <li> <button on:click={ () => addKey() } type="submit">Add key</button> </li>
        { /if }
      { /if }

      { #if algorithm }
        { #if $isAlgorithmRunning }
          <li> <button disabled>Visualize { algorithm }</button> </li>
        { :else }
          <li> <button on:click={ () => run( algorithm ) } type="submit" class="primaryButton">Visualize { algorithm }</button> </li>
        { /if }
      { :else }
        <li> <button disabled class="primaryButton">Choose an Algorithm</button> </li>
      { /if }

      { #if $isAlgorithmRunning }
        <li> <button disabled>Clear Path</button> </li>
      { :else }
        <li> <button on:click={ () => clear( 'path' ) } type="submit">Clear Path</button> </li>
      { /if }
      
      { #if $isAlgorithmRunning }
        <li> <button disabled>Clear Walls</button> </li>
      { :else }
        <li> <button on:click={ () => clear( 'walls' ) } type="submit">Clear Walls</button> </li>
      { /if }
      
      { #if $isAlgorithmRunning }
        <li> <button disabled>Clear Weights</button> </li>
      { :else }
        <li> <button on:click={ () => clear( 'weights' ) } type="submit">Clear Weights</button> </li>
      { /if }

      <li class="speed"> 
        <label for="speed">fast</label> 
        <input type="range" name="speed" min="0" max="1000" bind:value={ $speed }> 
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
    justify-content: space-between;
    height: 100%;
    padding: 20px;
    padding-right: 40px;
    gap: 20px 0;
  }

  h1{
    color: white;
  }

  ul{
    display: flex;
    gap: 18px;
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
    width: 40px;
    accent-color: var( --primary );
  }
  .speed label{
    font-weight: 600;
    font-size: 12px;
    margin-top: 2px;
  }

  /* ===== BUTTONS ===== */

  button{
    padding: 10px 17px;
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
  button:disabled{
    cursor: not-allowed;
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