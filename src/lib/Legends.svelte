<script>
  import { dfs, bfs, dijkstra, aStar } from "./helpers/pythonalgorithms";

  export let algorithm;
  let dialog;
  let code;

  function show( algorithm ){
    console.log(algorithm)
    dialog.showModal();
    switch ( algorithm ){
      case 'dfs':
        code = dfs;
        break;
      case 'bfs':
        code = bfs;
        break;
      case 'dijkstra':
        code = dijkstra;
        break;
      case 'a*':
        code = aStar;
        break;
    }
  }
</script>

<div class="legends">

  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  {#if algorithm }
    <button on:click={ () => show( algorithm ) }>&lt;/&gt;</button>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <dialog bind:this={ dialog } on:click={ dialog.close() }>
      <code>
        <pre>
          { code }
        </pre>
      </code>
    </dialog>
  {/if}

  <ul>
    <li>
      <img src="./person.svg" alt="person, start vertex" width="35px" height="35px">
      <span>start</span>
    </li>

    <li>
      <img src="./target.svg" alt="person, start vertex" width="35px" height="35px">
      <span>target</span>
    </li>

    <li>
      <img src="./weight.svg" alt="person, start vertex" width="35px" height="35px">
      <span>weights(+6)</span>
    </li>

    <li>
      <img src="./visited.svg" alt="person, start vertex" width="35px" height="35px">
      <span>visited(computed)</span>
    </li>
    
    <li>
      <img src="./explored.svg" alt="person, start vertex" width="35px" height="35px">
      <span>explored(stored)</span>
    </li>
    
    <li>
      <img src="./shortestpath.svg" alt="person, start vertex" width="35px" height="35px">
      <span>shortest path</span>
    </li>
    
    <li>
      <img src="./wall.svg" alt="person, start vertex" width="35px" height="35px">
      <span>walls</span>
    </li>
  </ul>
</div>

<style>

  .legends{
    padding: 30px;
    overflow-x: scroll;
  }
  .legends::-webkit-scrollbar {
    display: none;
  }

  ul{
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  li{
    display: flex;
    align-items: center;
    gap: 5px;
  }

  span{
    font-weight: bold;
    font-size: 15px;
    color: white;
  }

  button{
    padding: 8px;
    border-radius: 50%;
    border: none;
    color: white;
    background-color: var( --primary );
    position: absolute;
    cursor: pointer;
  }

  dialog{
    background-color: var( --secondary );
    border: none;
    color: white;
    font-weight: bold;
  }
</style>