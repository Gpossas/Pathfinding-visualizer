<script>
  import { dfs, bfs, dijkstra, aStar } from './pathfinding algorithms.js';

  export let startVertex;
  export let targetVertex;
</script>

<header>
  <button on:click={ () => dfs( startVertex ) } type="submit">DFS</button>
  <button on:click={ () => bfs( startVertex ) } type="submit">BFS</button>
  <button on:click={ () => dijkstra( startVertex ) } type="submit">Dijkstra</button>
  <button on:click={ () => aStar( startVertex, targetVertex ) } type="submit">A*</button>
</header>