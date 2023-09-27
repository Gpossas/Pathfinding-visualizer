import Vertex from './helpers/vertex.js';
import { isOutOfBounds } from './helpers/board.js';
import Queue from './helpers/queue.js';
import { graph } from './helpers/store.js';
import { get } from 'svelte/store';
import { sleep } from './helpers/sleep.js';

/** @param { Vertex } start start vertex */
export function dfs( start ){
  function traversePathTraveled(){
    while ( !pathTraveled.isEmpty() ){
      const vertex = pathTraveled.dequeue();
      vertex.visited = true;
    }
  }

  async function explore( row, column ){
    if ( 
      isOutOfBounds( row, column ) 
      || get(graph)[row][column].isWall 
      || get(graph)[row][column].explored
    ) return;

    if ( get(graph)[row][column].isTarget ){
      return true;
    }

    pathTraveled.enqueue( get(graph)[row][column] );
    graph.compute( row, column, 'explored' );

    await sleep( 10 );

    return (
      await explore( row - 1, column ) || 
      await explore( row, column + 1 ) ||
      await explore( row + 1, column ) ||
      await explore( row, column - 1 ) 
    );
  }

  const pathTraveled = new Queue();
  explore( ...start.coordinates );
  traversePathTraveled();
}