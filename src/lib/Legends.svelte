<div class="legends">
  <ul>
    <li>
      <img src="../src/assets/person.svg" alt="person, start vertex" width="35px" height="35px">
      <span>start</span>
    </li>

    <li>
      <img src="../src/assets/target.svg" alt="person, start vertex" width="35px" height="35px">
      <span>target</span>
    </li>

    <li>
      <img src="../src/assets/weight.svg" alt="person, start vertex" width="35px" height="35px">
      <span>weights(+6)</span>
    </li>

    <li>
      <img src="../src/assets/visited.svg" alt="person, start vertex" width="35px" height="35px">
      <span>visited(computed)</span>
    </li>
    
    <li>
      <img src="../src/assets/explored.svg" alt="person, start vertex" width="35px" height="35px">
      <span>explored(stored)</span>
    </li>
    
    <li>
      <img src="../src/assets/shortestpath.svg" alt="person, start vertex" width="35px" height="35px">
      <span>shortest path</span>
    </li>
    
    <li>
      <img src="../src/assets/wall.svg" alt="person, start vertex" width="35px" height="35px">
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
</style>