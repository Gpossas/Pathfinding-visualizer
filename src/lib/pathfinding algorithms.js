import Vertex from './helpers/vertex.js';
import { isOutOfBounds } from './helpers/board.js';
import Queue from './helpers/queue.js';
import { heapPush, heapPop } from './helpers/heap.js';
import { graph, rebuildPath, speed } from './helpers/store.js';
import { get } from 'svelte/store';
import { sleep } from './helpers/sleep.js';

/** @param { Vertex } start start vertex */
export async function dfs( start ){
  const pathTraveled = new Queue();
  const stack = [ start ];

  while ( stack ){
    let vertex = stack.pop();

    if ( vertex.isTarget ){
      await traversePathTraveled();
      rebuildPath.set( 'dfs' );
      return;
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
    explore( ...down, vertex );
    explore( ...right, vertex );
    explore( ...up, vertex );

    graph.compute( row, column, 'visited' );
    if ( ! get(rebuildPath) ) await sleep( get(speed) );
  }

  function explore( row, column, vertex ){
    if ( 
      isOutOfBounds( row, column ) 
      || get(graph)[row][column].isWall 
      || get(graph)[row][column].visited 
    ) return;
    
    graph.compute( row, column, 'explored' );
    stack.push( get(graph)[row][column] );
    graph.compute( row, column, 'previous', vertex );
  }

  async function traversePathTraveled(){
    while ( !pathTraveled.isEmpty() ){
      const vertex = pathTraveled.dequeue();
      graph.compute( ...vertex.coordinates, 'visited' );
      if ( ! get(rebuildPath) ) await sleep( get(speed) );
    }
  }
}

/** @param { Vertex } start start vertex */
export async function bfs( start ){
  const queue = new Queue();
  queue.enqueue( start );
  
  while ( !queue.isEmpty() ){
    let vertex = queue.dequeue();

    if ( vertex.isTarget ){
      await buildShortestPath( vertex );   
      rebuildPath.set( 'bfs' );
      return;
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
    if ( ! get(rebuildPath) ) await sleep( get(speed) );
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
    
    if ( vertex.isTarget ){
      await buildShortestPath( vertex );
      rebuildPath.set( 'dijkstra' );
      return;
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
    if ( ! get(rebuildPath) ) await sleep( get(speed) );
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
export async function aStar( start, target ){
  start.g = 0;
  start.f = getHeuristic( ...start.coordinates, ...target.coordinates );

  const priorityQueue = [ [ start.f, start.f, start ] ];
  while ( priorityQueue.length > 0 ){
    const vertex = heapPop( priorityQueue );
    
    if ( vertex.isTarget ){
      await buildShortestPath( vertex );
      rebuildPath.set( 'a*' );
      return;
    }
    if ( vertex.visited ){
      continue;
    }

    graph.compute( ...vertex.coordinates, 'visited' );

    const [row, column] = vertex.coordinates;
    const left = [row, column - 1];
    const right = [row, column + 1];
    const up = [row - 1, column];
    const down = [row + 1, column];
    explore( ...left, vertex, target, priorityQueue );
    explore( ...up, vertex, target, priorityQueue );
    explore( ...right, vertex, target, priorityQueue );
    explore( ...down, vertex, target, priorityQueue );
    if ( ! get(rebuildPath) ) await sleep( get(speed) );
  }

  function explore( row, column, vertex, target, priorityQueue ){
    if (
      isOutOfBounds( row, column )
      || get(graph)[row][column].isWall 
      || get(graph)[row][column].visited
    ) return;

    graph.compute( row, column, 'explored' );
    const neighbor = get(graph)[row][column];
    const g_cost = neighbor.value + vertex.g;
    const h_cost = getHeuristic( ...neighbor.coordinates, ...target.coordinates );
    const f_cost = g_cost + h_cost;

    if ( neighbor.f === undefined || f_cost < neighbor.f ){
      neighbor.f = f_cost;
      neighbor.g = g_cost;

      heapPush( priorityQueue, [ f_cost, h_cost, neighbor ] );
      neighbor.previous = vertex;
    }
  }

  /** @returns manhattan distance */
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
    if ( ! get(rebuildPath) ) await sleep( get(speed) );
  }
}