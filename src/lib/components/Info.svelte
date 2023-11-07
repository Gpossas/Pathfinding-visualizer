<script>
  export let algorithm;
</script>

<div class="info">
  { #if algorithm === 'dfs' }
    <p>
      dfs uses stack data structure(or recursion), 
      <strong>doesn't guarantee the shortest path</strong>,
       and is an unweighted algorithm; i.e.,
      <strong>ignores all weights in the graph</strong> 
    </p>
  { :else if algorithm === 'bfs' }
    <p>
      bfs uses queue data structure, 
      <strong>guarantees the shortest path</strong>,
       and is an unweighted algorithm; i.e.,
      <strong>ignores all weights in the graph</strong> 
    </p>
  { :else if algorithm === 'dijkstra' }
    <p>
      dijkstra uses heap data structure, 
      <strong>guarantees the shortest path</strong>,
      and it is a
      <strong>weighted algorithm</strong> 
    </p>
  { :else if algorithm === 'a*' }
  <p>
    a* chooses the path that minimizes the distance to the start and to the target(estimates using heuristics). 
    <strong>Guarantees the shortest path</strong>,
    and it is a
    <strong>weighted algorithm</strong> 
  </p>
  { :else }
    <p>choose an algorithm to view information about it</p>
  { /if }
</div>

<style>
  p{
    text-align: center;
    color: white;
  }
</style>