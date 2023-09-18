import './vertex.js';

/**
 * @param { int } rows
 * @param { int } columns
*/
export function createBoard( rows, columns ){
  for ( let row = 0; row < rows; row++ ){
    for ( let column = 0; column < columns; column++ ){
      const vertex_template = htmlToElement(
        `<div class="vertex"></div>`
      );
      board.append( vertex_template );
    }
  }
}

/**
 * @param { HTMLElement } board
 * @param { int } vertexSize
 * @param { int } rows
 * @param { int } columns
*/
export function setBoardDimensions( board, vertexSize, rows, columns ){
  board.style.gridTemplateRows = `${ vertexSize }px `.repeat( rows );
  board.style.gridTemplateColumns = `${ vertexSize }px `.repeat( columns );
}

/**
 * @param { String } html
 * @return { HTMLElement } 
*/
function htmlToElement( html ){
  const template = document.createElement( 'template' );
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

const totalWidth = window.innerWidth;
const totalHeight = window.innerHeight;
const headerSize = 0; //TODO: get height of header document.querySelector('header').offsetheight
export const vertexSize = 24;
export const columns = Math.floor( ( totalWidth * 0.9 ) / vertexSize );
export const rows = Math.floor( ( totalHeight * 0.98 - headerSize ) / vertexSize );