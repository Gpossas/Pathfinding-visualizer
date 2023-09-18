import { 
  createBoard, 
  setBoardDimensions,
  rows, columns, vertexSize,
} from './helpers/board.js';

const board = document.querySelector( '#board' );

setBoardDimensions( board, vertexSize, rows, columns )
createBoard( rows, columns );