export function heapPush( heap, value ){
  heap.push( value );
  heapifyBottomUp( heap, 0, heap.length - 1 );
}

function heapifyBottomUp( heap, rootIndex, childIndex ){
  while ( rootIndex < childIndex ){
    const parentIndex = ( childIndex - 1 ) >> 1; //Math.trunc( ( childIndex - 1 ) / 2 );
    const child = heap.at( childIndex );
    const parent = heap.at( parentIndex );
    
    if ( hasValueLessThan( child, parent ) ){
      [ heap[parentIndex], heap[childIndex] ] = [ heap[childIndex], heap[parentIndex] ];
      childIndex = parentIndex;
      continue;
    }
    break; 
  }
}

export function heapPop( heap ){
  const last = heap.pop();
  if ( heap.length > 0 ){
    const rootNode = heap.at( 0 );
    heap[0] = last;
    heapifyTopBottom( heap, 0 );
    return rootNode.at( -1 );
  }
  return last.at( -1 );
}

function heapifyTopBottom( heap, parentIndex ){
  let leftChild = 2 * parentIndex + 1;
  while ( leftChild < heap.length ){
    const rightChild = leftChild + 1;
    let smallestChild = leftChild;

    if ( rightChild < heap.length && hasValueLessThan( heap.at( rightChild ), heap.at( leftChild ) ) )
      smallestChild = rightChild;
    if ( hasValueLessThan( heap.at( parentIndex ), heap.at( smallestChild ) ) )
      break;
    [ heap[parentIndex], heap[smallestChild] ] = [ heap[smallestChild], heap[parentIndex] ];
    parentIndex = smallestChild;
    leftChild = 2 * parentIndex + 1;
  }
}

function heapsort( iterable ){
  const heap = [];
  for ( let value of iterable ){
    heapPush( heap, value );
  }

  const sortedArray = [];
  for ( let i = 0; i < heap.length; i++ ){
    sortedArray.push( heapPop( heap ) );
  }
  return sortedArray;
}
  
function heapify( iterable ){
  const firstParent = ( iterable.length - 2 ) >> 1;
  for ( let parentIndex = firstParent; parentIndex >= 0; parentIndex-- ){
    heapifyTopBottom( iterable, parentIndex );
  }
}

/**
 * @param { Array } first Iterable
 * @param { Array } second Iterable
 * @returns return true if the first iterator have at least one item less than second iterator
 */
function hasValueLessThan( first, second ){
  const firstSize = first.length;
  const secondSize = second.length;
  for ( let index = 0; index < firstSize && index < secondSize; index++ ){
    if ( first[index] < second[index] )
      return true;
    else if ( first[index] > second[index] ) 
      return false;
  }
  return false; // objects will continue the loop and return here
}