import { writable } from "svelte/store";
import { rows, columns, createBoard } from "./board";

export function vertexStore( vertex ){
  const { update, subscribe } = writable( vertex );

  return {
    subscribe,
    /** @param { string } status @param { any } value */
    compute: ( status, value = true ) => update( 
      vertex => ({
        ...vertex,
        [status]: value
      }) 
    ),
    clear: () => update(
      vertex => ({
        ...vertex,
        ['visited']: false,
        ['explored']: false,
        ['isShortestPath']: false,
        ['previous']: null,
        ['f']: Infinity,
        ['g']: Infinity,
      })
    )
  }
}

export let isAlgorithmRunning = writable( false );

export let visualizedAlgorithm = writable( '' );

export let speed = writable( 10 );

export const graph = createBoard( rows, columns );