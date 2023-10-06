<script>
  import Board from './lib/Board.svelte';
  import { rows, columns } from './lib/helpers/board';
  import { dfs, bfs, dijkstra, aStar } from './lib/pathfinding algorithms.js';
  import { graph } from './lib/helpers/store.js';

  let startVertex = $graph[Math.trunc( rows / 2 )][1];
  let targetVertex = $graph[Math.trunc( rows / 2 )][columns - 2];
  startVertex.isStart = true;
  targetVertex.isTarget = true;
</script>

<header>
  <button on:click={ () => dfs( startVertex ) } type="submit">DFS</button>
  <button on:click={ () => bfs( startVertex ) } type="submit">BFS</button>
  <button on:click={ () => dijkstra( startVertex ) } type="submit">Dijkstra</button>
  <button on:click={ () => aStar( startVertex, targetVertex ) } type="submit">A*</button>
</header>

<Board 
  { rows }
  { columns }
  bind:startVertex
  bind:targetVertex
/>

<style>

</style>