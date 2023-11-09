import { get } from "svelte/store";
import { graph, cloneGraph , vertexStore } from "./store";
import Vertex, { vertexSize } from "./vertex";

const totalWidth = window.innerWidth;
const totalHeight = window.innerHeight;
const headerSize = 200; //TODO: get height of header document.querySelector('header').offsetheight

export const columns = Math.floor( ( totalWidth * 0.98 ) / vertexSize );
export const rows = Math.floor( ( totalHeight * 0.98 - headerSize ) / vertexSize );


/**
 * @param { number } rows max number of rows
 * @param { number } columns max number of columns
 * @return Matrix containing vertices stores
 */
export function createBoard( rows, columns ){
  const matrix = [];
  for ( let row = 0; row < rows; row++ ){
    const rowItems = [];
    for ( let column = 0; column < columns; column++ ){
      rowItems.push( vertexStore( new Vertex( [ row, column ] ) ) );
    }
    matrix.push( rowItems );
  }
  return matrix;  
}

export function clearPath(){
  for ( let row = 0; row < rows; row++ ){
    for ( let column = 0; column < columns; column++ ){
      graph[row][column].clear();
      cloneGraph[row][column].clear();
    }
  }
}

export function clearWalls(){
  for ( let row = 0; row < rows; row++ ){
    for ( let column = 0; column < columns; column++ ){
      graph[row][column].compute( 'isWall', false );
      cloneGraph[row][column].compute( 'isWall', false );
    }
  }
}

export function clearWeights(){
  for ( let row = 0; row < rows; row++ ){
    for ( let column = 0; column < columns; column++ ){
      graph[row][column].compute( 'value', 1 );
      cloneGraph[row][column].compute( 'value', 1 );
    }
  }
}

export function makeGridFullOfWalls(){
  for ( let row = 0; row < rows; row++ ){
    for ( let column = 0; column < columns; column++ ){
      const vertex = get(graph[row][column]);
      if ( vertex.isStart || vertex.isTarget || vertex.isKey ){
        continue
      }

      graph[row][column].compute( 'isWall' );
    }
  }
}

export function isOutOfBounds( row, column ){
  return (
    row < 0 ||
    row >= rows ||
    column < 0 || 
    column >= columns
  );
}