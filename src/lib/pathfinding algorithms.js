import Vertex from './helpers/vertex.js';
import { isOutOfBounds } from './helpers/board.js';
import Queue from './helpers/queue.js';
import { graph } from './helpers/store.js';
import { get } from 'svelte/store';
import { sleep } from './helpers/sleep.js';

/** @param { Vertex } start start vertex */
export async function dfs( start ){
  async function traversePathTraveled(){
    while ( !pathTraveled.isEmpty() ){
      const vertex = pathTraveled.dequeue();
      graph.compute( ...vertex.coordinates, 'visited' );
      await sleep(10);
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
  await explore( ...start.coordinates );
  traversePathTraveled();
}

/** @param { Vertex } start start vertex */
export async function bfs( start ){
  const queue = new Queue();
  queue.enqueue( start );

  while ( !queue.isEmpty() ){
    let vertex = queue.dequeue();
    
    if ( vertex.isTarget ){
      return buildShortestPath( vertex );
    }

    const [row, column] = vertex.coordinates;
    const left = [row, column - 1];
    const right = [row, column + 1];
    const up = [row - 1, column];
    const down = [row + 1, column];
    explore( ...left, vertex );
    explore( ...right, vertex );
    explore( ...up, vertex );
    explore( ...down, vertex );

    get(graph)[row][column].visited = true;
    await sleep( 10 );
  }

  function explore( row, column, vertex ){
    if ( 
      isOutOfBounds( row, column ) 
      || get(graph)[row][column].isWall 
      || get(graph)[row][column].visited 
    ) return;
    
    get(graph)[row][column].explored = true;
    queue.enqueue( get(graph)[row][column] );
    get(graph)[row][column].previous = vertex;
  }

  async function buildShortestPath( vertex ){
    const pathStack = [];
    while ( vertex ){
      pathStack.push( vertex );
      vertex = vertex.previous;
    }

    while ( pathStack.length > 0 ){
      vertex = pathStack.pop();
      const [row, column] = vertex.coordinates;
      get(graph)[row][column].previous = true;
      await sleep( 10 );
    }
  }
}