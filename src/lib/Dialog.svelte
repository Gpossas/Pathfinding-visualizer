<script>
  import { onMount } from "svelte";


  onMount( () => {
    dialog.showModal();
  });
  let dialog;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={ dialog } on:click={ () => dialog.close() }>
  <ul>
    <li>click or hold <span>left</span> click mouse to <span>add walls</span>.</li>
    <li>click or hold <span>right</span> click mouse to <span>remove walls</span>.</li>
    <li>Hold <span>shift</span> and hold left click mouse to <span>add weights</span>.</li>
    <li>Hold <span>shift</span> and hold right click mouse to <span>remove weights</span>.</li>
    <li>move <span>person</span> and <span>target</span> anywhere on the board.</li>
    <li>If you <span>move</span> person or target after you running an algorithm it will <span>rebuild</span> the path immediately, so you can see other paths <span>BLAZINGLY FAST</span></li>
  </ul>
</dialog>

<style>
  dialog{
    border: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var( --secondary );
    color: white;
    font-weight: bold;
  }
  dialog::backdrop{
    background-color: rgba(0, 0, 0, 0.65);
  }

  ul{
    list-style: square;
  }

  span{
    color: var( --primary );
  }
</style>