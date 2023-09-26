import { writable } from "svelte/store";
import { rows, columns, createBoard } from "./board";

function graphStore(){
  const { update, subscribe } = writable( createBoard( rows, columns ) );

  return {
    subscribe,
    compute: ( row, column, status ) => update( ( graph ) => {
      graph[row][column][status] = true; // expected: compute(0, 1, 'isVisited') => graph[0][1].isVisited = true;
      return graph;
    })
  }
}

export const graph = graphStore();