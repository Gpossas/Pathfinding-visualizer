<script>
  import Board from './lib/Board.svelte';
  import Header from './lib/Header.svelte';
  import { rows, columns } from './lib/helpers/board';
  import { graph } from './lib/helpers/store.js';

  let startVertex = $graph[Math.trunc( rows / 2 )][1];
  let targetVertex = $graph[Math.trunc( rows / 2 )][columns - 2];
  startVertex.isStart = true;
  targetVertex.isTarget = true;
</script>

<Header
  { startVertex }
  { targetVertex }
/>

<Board 
  { rows }
  { columns }
  bind:startVertex
  bind:targetVertex
/>