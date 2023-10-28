import { get } from "svelte/store";
import { graph } from "./store";
import Vertex, { vertexSize } from "./vertex";

const totalWidth = window.innerWidth;
const totalHeight = window.innerHeight;
const headerSize = 20; //TODO: get height of header document.querySelector('header').offsetheight

export const columns = Math.floor( ( totalWidth * 0.9 ) / vertexSize );
export const rows = Math.floor( ( totalHeight * 0.98 - headerSize ) / vertexSize );


/**
 * @param { number } rows max number of rows
 * @param { number } columns max number of columns
 * @return { Array<Array<Vertex>> } Matrix containing vertices
 */
export function createBoard( rows, columns ){
  const matrix = [];
  for ( let row = 0; row < rows; row++ ){
    const rowItems = [];
    for ( let column = 0; column < columns; column++ ){
      rowItems.push( new Vertex( [ row, column ] ) );
    }
    matrix.push( rowItems );
  }
  return matrix;  
}

 
export function clearPath(){
  for ( let row of get(graph) ){
    for ( let vertex of row ){
      vertex.visited = false;
      vertex.explored = false;
      vertex.isShortestPath = false;
      vertex.previous = null;
      vertex.f = Infinity;
      vertex.g = Infinity;
    }
  }
}

export function clearWalls(){
  for ( let row of get(graph) ){
    for ( let vertex of row ){
      graph.compute( ...vertex.coordinates, 'isWall', false );
    }
  }
}

export function clearWeights(){
  for ( let row of get(graph) ){
    for ( let vertex of row ){
      graph.compute( ...vertex.coordinates, 'value', 1 );
    }
  }
}

export function makeGridFullOfWalls(){
  for ( let row of get(graph) ){
    for ( let vertex of row ){
      if ( !( vertex.isStart || vertex.isTarget ) )
        graph.compute( ...vertex.coordinates, 'isWall' );
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