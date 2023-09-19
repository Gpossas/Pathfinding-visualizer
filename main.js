import { 
  createBoard, 
  setBoardDimensions,
  rows, columns, vertexSize,
} from './helpers/board.js';

const board = document.querySelector( '#board' );

setBoardDimensions( board, vertexSize, rows, columns )
createBoard( rows, columns );

function hovering(e){
  console.log(e.target)
}

board.addEventListener( 'mousedown', ( e ) => {
  console.log(e.target);
  board.addEventListener( 'mouseover', hovering );
});

board.addEventListener('mouseup', (e) => {
  board.removeEventListener('mouseover', hovering);
})