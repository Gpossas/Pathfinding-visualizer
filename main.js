import { createBoard, setBoardDimensions } from './helpers/board.js';

const board = document.querySelector( '#board' );
const totalWidth = window.innerWidth;
const totalHeight = window.innerHeight;
const headerSize = 0; //TODO: get height of header document.querySelector('header').offsetheight
const vertexSize = 24;
const columns = Math.floor( ( totalWidth * 0.9 ) / vertexSize );
const rows = Math.floor( ( totalHeight * 0.98 - headerSize ) / vertexSize );
setBoardDimensions( board, vertexSize, rows, columns )
createBoard( rows, columns );