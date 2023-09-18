import { createBoard } from './helpers/board.js';

const board = document.querySelector( '#board' );
const rows = window.getComputedStyle( board )['gridTemplateRows'].split(' ').length;
const columns = window.getComputedStyle( board )['gridTemplateColumns'].split(' ').length;
createBoard( rows, columns );