<script>
  import { dfs, bfs, dijkstra, aStar } from './pathfinding algorithms.js';
  import { rebuildPath } from './helpers/store.js';
  import { clearPath } from './helpers/board.js';
  import { randomizedPrims } from './maze_generators.js'

  export let startVertex;
  export let targetVertex;

  let algorithm = null;

  function run( algorithm ){
    rebuildPath.set('');
    clearPath();
    switch ( algorithm ){
      case 'dfs': return dfs( startVertex );
      case 'bfs': return bfs( startVertex );
      case 'dijkstra': return dijkstra( startVertex );
      case 'a*': return aStar( startVertex, targetVertex );
    }  
  }
</script>

<header>

  <h1>Pathfinding Visualizer</h1>
  <nav>
    <ul class="action_buttons">
      <li>
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
      
      <li>
        <button>Generate Maze ⠀⠀⠀▼</button>
        <ul class="dropdown">
          <li> <button on:click={ () => randomizedPrims( startVertex ) } type="submit">Randomized Prims</button>  </li>
        </ul>
      </li>

      {#if algorithm }
        <li> <button on:click={ () => run( algorithm ) } type="submit">Visualize { algorithm }</button>  </li>
      {:else }
        <li> <button disabled>Visualize</button> </li>
      {/if }

      <li> <button on:click={ () => clearPath() } type="submit">Clear Path</button>  </li>
       
    </ul>
  </nav>
</header>

<style>

  header{
    background-color: var( --secondary );
    display: flex;
    align-items: center;
    height: 91px;
    padding-left: 20px;
  }

  h1{
    color: white;
  }

  ul{
    list-style: none;
  }

  .action_buttons{
    display: flex;
    gap: 20px;
  }

  ul li{
    display: inline-block;
    position: relative; 
  }

  li .dropdown{
    padding: 5px;
    width: 100%; 
  }

  .dropdown{
    border-top: 7px solid var( --secondary );

    width: 100%;
    background-color: var( --background );
    position: absolute;
    z-index: 999;
    display: none;
  }

  li:hover .dropdown{
    display: block;
  }

  .dropdown li{
    width: 100%;
  }

  button{
    padding: 10px 20px;
    color: white;
    font-weight: 600;
    font-size: 15px;
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

</style>