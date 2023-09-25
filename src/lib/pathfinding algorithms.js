import Vertex from './helpers/vertex.js';
import { isOutOfBounds } from './helpers/board.js';
import Queue from './helpers/queue.js';

/**
 * @param { Vertex } start start vertex
 * @param { Array<Array<Vertex>> } graph graph
 */
export function dfs( start, graph ){
  function traversePathTraveled(){
    while ( !pathTraveled.isEmpty() ){
      const vertex = pathTraveled.dequeue();
      vertex.visited = true;
    }
  }
  function explore( row, column ){
    if ( 
      isOutOfBounds( row, column ) 
      || graph[row][column].isWall 
      || graph[row][column].explored
    ) return;

    if ( graph[row][column].isTarget ){
      return true;
    }

    pathTraveled.enqueue( graph[row][column] );
    graph[row][column].explored = true;
    return (
      explore( row - 1, column ) || 
      explore( row, column + 1 ) ||
      explore( row + 1, column ) ||
      explore( row, column - 1 ) 
    );
  }

  const pathTraveled = new Queue();
  explore( start.coordinates );
  traversePathTraveled();
}