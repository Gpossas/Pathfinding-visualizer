import { writable } from "svelte/store";
import { rows, columns, createBoard } from "./board";

function graphStore(){
  const { update, subscribe } = writable( createBoard( rows, columns ) );

  return {
    subscribe,
    compute: ( row, column, status, value = true ) => update( ( graph ) => {
      graph[row][column][status] = value; // expected: compute(0, 1, 'isVisited') => graph[0][1].isVisited = true;
      return graph;
    })
  }
}

export let isAlgorithmRunning = writable( false );

export let visualizedAlgorithm = writable( '' );

export let speed = writable( 0 );

export const graph = graphStore();