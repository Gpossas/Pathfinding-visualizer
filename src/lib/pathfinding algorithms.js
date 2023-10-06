import Vertex from './helpers/vertex.js';
import { isOutOfBounds } from './helpers/board.js';
import Queue from './helpers/queue.js';
import { heapPush, heapPop } from './helpers/heap.js';
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
    if ( vertex.visited ){
      continue;
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

    graph.compute( row, column, 'visited' );
    await sleep( 10 );
  }

  function explore( row, column, vertex ){
    if ( 
      isOutOfBounds( row, column ) 
      || get(graph)[row][column].isWall 
      || get(graph)[row][column].visited 
    ) return;
    
    graph.compute( row, column, 'explored' );
    queue.enqueue( get(graph)[row][column] );
    graph.compute( row, column, 'previous', vertex );
  }
}

/** @param { Vertex } start start vertex */
export async function dijkstra( start ){
  const shortestDistance = new Map();
  shortestDistance.set( start, 0 );
  const priorityQueue = [ [ 0, start ] ];

  while ( priorityQueue.length > 0 ){
    const vertex = heapPop( priorityQueue );
    debugger
    if ( vertex.isTarget ){
      return buildShortestPath( vertex );
    }
    if ( vertex.visited ){
      continue;
    }

    const [row, column] = vertex.coordinates;
    const left = [row, column - 1];
    const right = [row, column + 1];
    const up = [row - 1, column];
    const down = [row + 1, column];
    explore( ...left, vertex, shortestDistance, priorityQueue );
    explore( ...right, vertex, shortestDistance, priorityQueue );
    explore( ...up, vertex, shortestDistance, priorityQueue );
    explore( ...down, vertex, shortestDistance, priorityQueue );

    graph.compute( row, column, 'visited' );
    await sleep( 10 );
  }

  function explore( row, column, vertex, shortestDistance, priorityQueue ){
    if ( 
      isOutOfBounds( row, column ) 
      || get(graph)[row][column].isWall
      || get(graph)[row][column].visited
    ) return;
    
    graph.compute( row, column, 'explored' );
    const neighbor = get(graph)[row][column];
    const distance = neighbor.value + ( shortestDistance.get( vertex ) || 0 );
    if ( !shortestDistance.has( neighbor ) || distance < shortestDistance.get( neighbor ) ){
      shortestDistance.set( neighbor, distance );
      neighbor.previous = vertex;
      heapPush( priorityQueue, [ distance, neighbor ] );
    }
  }
}

/**
 * @param { Vertex } start 
 * @param { Vertex } target 
 */
async function aStar( start, target ){
  start.h = getHeuristic( ...start.coordinates, ...target.coordinates );
  start.f = start.h;

  // when comparing the priority, if items have the same f value, it will choose the one with the minimum g value
  // I choose g value instead of h value because the heuristic cannot handle the weights in the path
  const priorityQueue = [ [ start.f, start.g, start ] ];
  while ( priorityQueue.length > 0 ){
    
  }

  /** {*} @returns manhattan distance */
  function getHeuristic( x1, y1, x2, y2 ){
    return Math.abs( x1 - x2 ) + Math.abs( y1 - y2 );
  }
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
    graph.compute( row, column, 'isShortestPath' );
    await sleep( 10 );
  }
}