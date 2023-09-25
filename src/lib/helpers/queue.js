class NodeStructure{
  constructor( value ){
    this.value = value;
    this.previous = null;
  }
}

export default class Queue{
  constructor(){
    this.front = null;
    this.rear = null;
  }

  enqueue( value ) {
    this.isEmpty() ?
    this.front = this.rear = new NodeStructure( value ) :
    this.rear = this.rear.previous = new NodeStructure( value );
  }

  dequeue(){
    if ( this.isEmpty() ) return;

    const value = this.front.value;
    this.front = this.front.previous;
    return value;
  }

  isEmpty(){
    return ( this.front === null );
  }
}