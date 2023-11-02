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

def build_shortest_path( vertex ):
  path = [] # stack
  while vertex:
    path.append( vertex )
    vertex = vertex.previous

  while path:  
    vertex = path.pop()
    vertex.is_shortest_path = True

def is_out_of_bounds( row, column ):
  return (
    row < 0 
    or row >= MAX_ROWS
    or column < 0
    or column >= MAX_COLUMNS
  )
`;

export const bfs = `
def bfs( start: Vertex ) -> None:
  queue = deque( [ start ] )
  
  while queue:
    vertex = queue.popleft()
    row, column = vertex.coordinates

    if vertex.target: 
     return buildShortestPath( vertex )
    if vertex.visited: 
      continue

    # explore neighbors
    left: tuple = ( row, column - 1 )
    right: tuple = ( row, column + 1 )
    up: tuple = ( row - 1, column )
    bottom: tuple = ( row + 1, column )

    explore( *left, vertex, queue )
    explore( *right, vertex, queue )
    explore( *up, vertex, queue )
    explore( *bottom, vertex, queue )

    vertex.visited = True
    
def explore( row, column, vertex, queue ):
  if (
    is_out_of_bounds( row, column ) 
    or (neighbor := self.graph[row][column]).is_wall
    or neighbor.visited
    or neighbor.is_explored
    ): return
  
  neighbor.explored = True
  queue.append( neighbor )
  neighbor.previous = vertex
  
  def build_shortest_path( vertex ):
    path = [] # stack
    while vertex:
      path.append( vertex )
      vertex = vertex.previous

    while path:  
      vertex = path.pop()
      vertex.is_shortest_path = True

def is_out_of_bounds( row, column ):
  return (
    row < 0 
    or row >= MAX_ROWS
    or column < 0
    or column >= MAX_COLUMNS
  )
`;

export const dijkstra = `
def dijkstra( start: Vertex ):
  shortest_distance = { start: 0 }
  priority_queue: 'heapq' = [ ( 0, start ) ]

  while priority_queue:
    vertex = heapq.heappop( priority_queue )[-1]
    row, column = vertex.coordinates

    if vertex.target: 
      return build

    left: tuple = ( row, column - 1 )
    right: tuple = ( row, column + 1 )
    up: tuple = ( row - 1, column )
    bottom: tuple = ( row + 1, column )
    
    explore( *up, vertex, priority_queue )
    explore( *right, vertex, priority_queue )
    explore( *left, vertex, priority_queue )
    explore( *bottom, vertex, priority_queue )

    vertex.visited = True 

def explore( row, column, vertex ):
  if (
    is_out_of_bounds( row, column ) 
    or (neighbor := self.graph[row][column]).is_wall
    or neighbor.visited
  ): return

  neighbor.explored = True
  distance = shortest_distance.get( vertex, 0 ) + neighbor.value
  if distance < shortest_distance.get( neighbor, float( 'inf' ) ):
    # you may want to change heappush for a decrease_key function to not add duplicates in heap, but time complexity is similar
    heapq.heappush( priority_queue, ( distance, neighbor ) )
    shortest_distance[neighbor] = distance
    neighbor.previous = vertex

def build_shortest_path( vertex ):
  path = [] # stack
  while vertex:
    path.append( vertex )
    vertex = vertex.previous

  while path:  
    vertex = path.pop()
    vertex.is_shortest_path = True
`