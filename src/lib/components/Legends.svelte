<script>
  import { dfs, bfs, dijkstra, aStar } from "../helpers/pythonalgorithms";

  export let algorithm;
  let dialog;
  let code;

  function show( algorithm ){
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
  { #if algorithm }
    {#key algorithm }
      <button on:click={ () => show( algorithm ) }>&lt;/&gt;</button>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <dialog bind:this={ dialog } on:click={ dialog.close() }>
        <div>
          <a href="https://github.com/Gpossas/Pathfinding-visualizer">
          <img src="./github.png" alt="github link" height="30px">
          </a>
        </div>

        <code>
          <pre>
            { code }
          </pre>
        </code>
      </dialog>
    {/key}
  { /if }

  <ul>
    <li>
      <img src="./person.svg" alt="person, start vertex" width="35px" height="35px">
      <span>start</span>
    </li>

    <li>
      <img src="./target.svg" alt="finish, target vertex" width="35px" height="35px">
      <span>target</span>
    </li>

    <li>
      <img src="./weight.svg" alt="weight" width="35px" height="35px">
      <span>weights(+6)</span>
    </li>

    <li>
      <img src="./visited.svg" alt="visited vertex" width="35px" height="35px">
      <span>visited(computed)</span>
    </li>
    
    <li>
      <img src="./explored.svg" alt="explored vertex" width="35px" height="35px">
      <span>explored(stored)</span>
    </li>
    
    <li>
      <img src="./shortestpath.svg" alt="shortest path vertex" width="35px" height="35px">
      <span>shortest path</span>
    </li>
    
    <li>
      <img src="./wall.svg" alt="wall" width="35px" height="35px">
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
    animation: slideFromLeft 1s ease-out;
  }

  dialog{
    background-color: var( --secondary );
    border: none;
    color: white;
    font-weight: bold;
  }

  @keyframes slideFromLeft {
    0%{
      transform: translateX(-80px);
    }
    50%{
      transform: translateX(5px);
    }
    100%{
      transform: translateX(0);
    }
  }
</style>