<script>
  import Board from './lib/components/Board.svelte';
  import Header from './lib/components/Header.svelte';
  import Legends from './lib/components/Legends.svelte';
  import Info from './lib/components/Info.svelte';
  import Dialog from './lib/components/Dialog.svelte';
  import { rows, columns } from './lib/helpers/board';
  import { graph } from './lib/helpers/store.js';

  let startVertex = graph[Math.trunc( rows / 2 )][Math.trunc( columns / 4 )];
  let targetVertex = graph[Math.trunc( rows / 2 )].at( -Math.trunc( columns / 4 ) );
  startVertex.compute( 'isStart', true );
  targetVertex.compute( 'isTarget', true );

  let algorithm = '';
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