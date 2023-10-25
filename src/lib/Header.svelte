<script>
  import { dfs, bfs, dijkstra, aStar } from './pathfinding algorithms.js';
  import { rebuildPath } from './helpers/store.js';
  import { clearPath } from './helpers/board.js';

  export let startVertex;
  export let targetVertex;

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
  <button on:click={ () => run( 'dfs' ) } type="submit">DFS</button>
  <button on:click={ () => run( 'bfs' ) } type="submit">BFS</button>
  <button on:click={ () => run( 'dijkstra' ) } type="submit">Dijkstra</button>
  <button on:click={ () => run( 'a*' ) } type="submit">A*</button>
</header>