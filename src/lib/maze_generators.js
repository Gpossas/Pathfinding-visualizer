import { get } from "svelte/store";
import { isOutOfBounds } from "./helpers/board";
import { graph } from "./helpers/store";
import { makeGridFullOfWalls } from "./helpers/board";

export async function randomizedPrims( start ){
  // starts will all cells as walls in the graph and create a minimum spanning tree 

  makeGridFullOfWalls();

  const walls = new Set([start]);
  while ( walls.size > 0 ){
    const cell = getRandomKey( walls );
    walls.delete( cell );
    
    const neighbors = getNeighbors( cell );
    if ( neighbors.size > 0 ){
      const neighbor = getRandomKey( neighbors );
      connectWallWithPassage( ...cell.coordinates, ...neighbor.coordinates );
    }
    const frontiers = getFrontiers( cell );
    for ( let frontier of frontiers ){
      walls.add( frontier );
    }
  }

  function getNeighbors( cell ){
    //The neighbours of a cell are all passages with exact distance two
    
    const neighbors = new Set();
    const [row, column] = cell.coordinates;
    const left = isOutOfBounds( row, column - 2 ) || get(graph)[row][column - 2].isWall ? null : get(graph)[row][column - 2];
    const right = isOutOfBounds( row, column + 2 ) || get(graph)[row][column + 2].isWall ? null : get(graph)[row][column + 2];
    const up = isOutOfBounds( row - 2, column ) || get(graph)[row - 2][column].isWall ? null : get(graph)[row - 2][column];
    const down = isOutOfBounds( row + 2, column ) || get(graph)[row + 2][column].isWall ? null : get(graph)[row + 2][column];
    
    if ( left )
      neighbors.add( left );
    if ( right )
      neighbors.add( right );
    if ( up )
      neighbors.add( up );
    if ( down )
      neighbors.add( down );
    return neighbors;
  }

  function getFrontiers( cell ){
    // The frontier of a cell are all walls with exact distance two
    
    const neighbors = new Set();
    const [row, column] = cell.coordinates;
    const left = isOutOfBounds( row, column - 2 ) || !get(graph)[row][column - 2].isWall ? null : get(graph)[row][column - 2];
    const right = isOutOfBounds( row, column + 2 ) || !get(graph)[row][column + 2].isWall ? null : get(graph)[row][column + 2];
    const up = isOutOfBounds( row - 2, column ) || !get(graph)[row - 2][column].isWall ? null : get(graph)[row - 2][column];
    const down = isOutOfBounds( row + 2, column ) || !get(graph)[row + 2][column].isWall ? null : get(graph)[row + 2][column];

    if ( left )
      neighbors.add( left );
    if ( right )
      neighbors.add( right );
    if ( up )
      neighbors.add( up );
    if ( down )
      neighbors.add( down );

    return neighbors;
  }

  function connectWallWithPassage( wallX, wallY, passageX, passageY ){
    //convert that wall and the wall between them to passages
    const x = Math.floor( ( wallX + passageX ) / 2 );
    const y = Math.floor( ( wallY + passageY ) / 2 );

    graph.compute( wallX, wallY, 'isWall', false );
    graph.compute( x, y, 'isWall', false );
  }

  function getRandomKey( collection ) {
    let keys = Array.from( collection.keys() );
    return keys[Math.floor( Math.random() * keys.length )];
  }
}