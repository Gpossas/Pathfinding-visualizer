<script>
  import Board from './lib/Board.svelte';
  import { createBoard, rows, columns } from './lib/helpers/board';
  import { dfs } from './lib/pathfinding algorithms.js';

  const graph = createBoard( rows, columns );  
  let startVertex = graph[Math.trunc( rows / 2 )][1];
  let targetVertex = graph[Math.trunc( rows / 2 )][columns - 2];
  startVertex.isStart = true;
  targetVertex.isTarget = true;
</script>

<header>
  <button on:click={ () => dfs( startVertex, graph ) } type="submit">DFS</button>
</header>

<Board 
  { graph } 
  { startVertex } 
  { targetVertex } 
  { rows }
  { columns }
/>

<style>

</style>