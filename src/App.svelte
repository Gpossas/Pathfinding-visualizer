<script>
  import Board from './lib/Board.svelte';
  import Header from './lib/Header.svelte';
  import Legends from './lib/Legends.svelte';
  import Info from './lib/Info.svelte';
  import Dialog from './lib/Dialog.svelte';
  import { rows, columns } from './lib/helpers/board';
  import { graph } from './lib/helpers/store.js';

  let startVertex = $graph[Math.trunc( rows / 2 )][Math.trunc( columns / 4 )];
  let targetVertex = $graph[Math.trunc( rows / 2 )].at( -Math.trunc( columns / 4 ) );
  startVertex.isStart = true;
  targetVertex.isTarget = true;

  let algorithm;
</script>

<Dialog/>

<Header
  { startVertex }
  { targetVertex }
  bind:algorithm
/>

<Legends { algorithm } />

<Info { algorithm } />

<Board 
  { rows }
  { columns }
  bind:startVertex
  bind:targetVertex
/>