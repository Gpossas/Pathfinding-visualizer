export const dfs = `
def dfs( start: Vertex ):
  stack = [ start ]
  while stack:
    vertex = stack.pop()
    vertex.visited = True
    row, column = vertex.coordinates
    
    left: tuple = ( row, column - 1 )
    right: tuple = ( row, column + 1 )
    up: tuple = ( row - 1, column )
    bottom: tuple = ( row + 1, column )
    
    flag = { is_target_found: false }
    explore( *left, vertex, flag, stack )
    explore( *right, vertex, flag, stack )
    explore( *up, vertex, flag, stack )
    explore( *bottom, vertex, flag, stack )
    
    if flag['is_target_found']:
      build_shortest_path( flag['target'] )
      return
    
def explore(row, column, vertex, flag, stack ):
  if (
    is_out_of_bounds( row, column ) 
    or (neighbor := self.graph[row][column]).is_wall
    or neighbor.visited
    or neighbor.is_explored
  ): return
  
  neighbor.previous = vertex
  
  if neighbor.is_target:
    flag['target'] = neighbor
    flag['is_target_found'] = True
    neighbor.visited = True
    return
  
  neighbor.exlored = True
  stack.push( neighbor )
  
def is_out_of_bounds( row, column ):
  return (
    row < 0 
    or row >= MAX_ROWS
    or column < 0
    or column >= MAX_COLUMNS
)
`