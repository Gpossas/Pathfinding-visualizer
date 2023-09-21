import Vertex, { vertexSize } from "./vertex";

/**
 * @param { number } rows max number of rows
 * @param { number } columns max number of columns
 * @return { Array } Matrix containing vertices
 */
export function createBoard( rows, columns ){
  const board = [];
  for ( let index = 0; index < rows * columns; index++ ){
    board.push( new Vertex( index ) )
  }
  return board;
}

/**
 * @param { HTMLElement } board
 * @param { number } vertexSize
 * @param { number } rows
 * @param { number } columns
 */
export function setBoardDimensions( board, vertexSize, rows, columns ){
  board.style.setProperty( 'grid-template-rows', `repeat(${ rows }, ${ vertexSize }px)` );
  board.style.setProperty( 'grid-template-columns', `repeat(${ columns }, ${ vertexSize }px)` );
}

const totalWidth = window.innerWidth;
const totalHeight = window.innerHeight;
const headerSize = 0; //TODO: get height of header document.querySelector('header').offsetheight

export const columns = Math.floor( ( totalWidth * 0.9 ) / vertexSize );
export const rows = Math.floor( ( totalHeight * 0.98 - headerSize ) / vertexSize );