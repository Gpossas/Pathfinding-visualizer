import Vertex from './helpers/vertex.js';
import { columns, isOutOfBounds } from './helpers/board.js';
import Queue from './helpers/queue.js';
import { heapPush, heapPop } from './helpers/heap.js';
import { graph, visualizedAlgorithm, speed, key, cloneGraph } from './helpers/store.js';
import { get } from 'svelte/store';
import { sleep } from './helpers/sleep.js';

/** @param { Vertex } start start vertex */
export async function dfs( start ){
  const stack = [ start ];

  while ( stack ){
    let vertex = stack.pop();
    
    const [row, column] = vertex.coordinates;
    graph.compute( row, column, 'visited' );

    const left = [row, column - 1];
    const right = [row, column + 1];
    const up = [row - 1, column];
    const down = [row + 1, column];

    const flag = new Object();
    flag['isTargetFound'] = false;
    explore( ...left, vertex, flag );
    explore( ...down, vertex, flag );
    explore( ...right, vertex, flag );
    explore( ...up, vertex, flag );
    
    if ( flag['isTargetFound'] ){
      await buildShortestPath( flag['target'] );
      break;
    }

    if ( ! get(visualizedAlgorithm) ) await sleep( get(speed) );
  }

  function explore( row, column, vertex, flag ){
    if ( 
      isOutOfBounds( row, column ) 
      || get(graph)[row][column].isWall 
      || get(graph)[row][column].visited    
      || get(graph)[row][column].explored 
    ) return;

    if ( get(graph)[row][column].isTarget ){
      flag['target'] = get(graph)[row][column];
      flag['isTargetFound'] = true;
      graph.compute( row, column, 'visited' );
      graph.compute( row, column, 'previous', vertex );
      return;
    }
    
    graph.compute( row, column, 'explored' );
    stack.push( get(graph)[row][column] );
    graph.compute( row, column, 'previous', vertex );
  }

  visualizedAlgorithm.set( 'dfs' );
}

export async function bfs( start ){
  const queue = new Queue();
  queue.enqueue( get(start).coordinates );
  
  while ( !queue.isEmpty() ){
    const [row, column] = queue.dequeue();
    const vertex = hasKeyAndKeyNotFound() ? get(cloneGraph[row][column]) : get(graph[row][column]);

    if ( vertex.visited ){
      continue;
    }
    if ( isTargetAndDontHaveKey( row, column ) || isTargetAndKeyFound( row, column ) ){
      await buildShortestPath( row, column );   
      break;
    }
    if ( get(graph[row][column]).isKey && hasKeyAndKeyNotFound() ){
      await buildShortestPath( row, column, true );
      key.found();
      return bfs( graph[row][column] );
    }

    const left = [row, column - 1];
    const right = [row, column + 1];
    const up = [row - 1, column];
    const down = [row + 1, column];
    explore( ...left, vertex );
    explore( ...right, vertex );
    explore( ...up, vertex );
    explore( ...down, vertex );
    
    hasKeyAndKeyNotFound() 
      ? cloneGraph[row][column].compute( 'visited' ) 
      : graph[row][column].compute( 'visited' );
      
    if ( ! get(visualizedAlgorithm) ) await sleep( get(speed) );
  }

  visualizedAlgorithm.set( 'bfs' );

  function explore( row, column, vertex ){
    if ( 
      isOutOfBounds( row, column ) 
      || get(graph[row][column]).isWall 
      || hasVisitedInOriginalGraph( row, column )
      || hasExploredInOriginalGraph( row, column )
      || hasVisitedInCloneGraph( row, column )
      || hasExploredInCloneGraph( row, column )
    ) return;
    
    if ( hasKeyAndKeyNotFound() ){
      cloneGraph[row][column].compute( 'explored' );
      cloneGraph[row][column].compute( 'previous', vertex );
    }
    else{
      graph[row][column].compute( 'explored' );
      graph[row][column].compute( 'previous', vertex );
    }
    queue.enqueue( [row, column] );
  }

  function hasKeyAndKeyNotFound(){
    return get(key).vertex && !get(key).found;
  }

  function isTargetAndDontHaveKey( row, column ){
    return get(graph[row][column]).isTarget && !get(key).vertex;
  }

  function isTargetAndKeyFound( row, column ){
    return get(graph[row][column]).isTarget && get(key).vertex && get(key).found;
  }

  function hasVisitedInOriginalGraph( row, column ){
    return ( 
      get(graph[row][column]).visited && !get(key).vertex 
      || get(graph[row][column]).visited && get(key).vertex && get(key).found
    )
  }
  function hasExploredInOriginalGraph( row, column ){
    return ( 
      get(graph[row][column]).explored && !get(key).vertex 
      || get(graph[row][column]).explored && get(key).vertex && get(key).found
    )
  }

  function hasVisitedInCloneGraph( row, column ){
    return get(cloneGraph[row][column]).visited && get(key).vertex && !get(key).found
  }
  function hasExploredInCloneGraph( row, column ){
    return get(cloneGraph[row][column]).explored && get(key).vertex && !get(key).found
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
      break;
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
    if ( ! get(visualizedAlgorithm) ) await sleep( get(speed) );
  }

  visualizedAlgorithm.set( 'dijkstra' );

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
      break;
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
    if ( ! get(visualizedAlgorithm) ) 
      await sleep( get(speed) );
  }

  visualizedAlgorithm.set( 'a*' );

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

async function buildShortestPath( row, column, isCloneGraph = false ){
  const pathStack = [];
  let vertex;

  do{
    vertex = isCloneGraph ? cloneGraph[row][column]: graph[row][column];
    pathStack.push( [row, column] );
    [row, column] = get(vertex).previous ? get(vertex).previous.coordinates : [-1, -1];
  }
  while( row !== -1 )

  while ( pathStack.length > 0 ){
    [row, column] = pathStack.pop();
    vertex = isCloneGraph ? cloneGraph[row][column]: graph[row][column];
    vertex.compute( 'isShortestPath' );

    if ( ! get(visualizedAlgorithm) ) await sleep( get(speed) );
  }
}