<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { Header } from "./components/Header/header";
  import { Pallete } from "./components/Pallete/pallete";
  import { Text } from "./components/Text/text";
  import type { Component } from "./components/component";
  import { EditorContext } from "./editorContext";
  import { fade } from "svelte/transition";
  import Icon from "./icons/components/Icon.svelte";
  import plus from "./icons/icons/plus";
  import alignCenter from "./icons/icons/alignCenter";
  import trash from "./icons/icons/trash";

  export let components: Component[] = [
    new Header(1, "Header"),
    new Text("Text"),
    new Pallete(),
  ];

  function addComponent(component: Component, position?: number) {
    if (position != null) {
      components.splice(position, 0, component);
    } else {
      components = [...components, component];
    }
  }

  function deleteComponent(component: Component, position?: number) {
    if (position != null) {
      components.splice(position, 1);
    } else {
      components = components.filter((t) => t != component);
    }
    if (components.length == 0) {
      addPallete();
    }
  }

  function addPallete(position?:number) {
    if(position!=null)position++;
    components = components.filter((c) => c.name != "Pallete");
    addComponent(new Pallete(),position);
  }

  function enter(component: Component) {
    addPallete();
  }

  function swap(a: Component, b: Component) {
    let index = components.findIndex((v)=>v==a);
    components.splice(index,1,b);
    components = components;
  }

  function swapByPositions(p1: number, p2: number) {
    if (
      p1 >= 0 &&
      p2 >= 0 &&
      p1 < components.length &&
      p2 < components.length &&
      p1 !== p2
    ) {
      const temp = components[p1];
      components[p1] = components[p2];
      components[p2] = temp;
    } else {
      console.error(
        "Invalid positions provided. Make sure they are within the componentsay bounds and distinct."
      );
    }
  }

  onMount(() => {
    if (components.length == 0) addPallete();
  });

  export let hovered = -1;

  setContext(
    "editor",
    new EditorContext(addComponent, deleteComponent, enter, swap)
  );

  function dragStart(e:any, index:number) {
    e.dataTransfer.setData("text/plain", index);
  }

  function dragOver(e:any) {
    e.preventDefault();
  }

  function drop(e:any, index:number) {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
    swapByPositions(fromIndex, index);
  }
</script>

<div on:mouseleave={() => (hovered = -1)}>
  {#each components as component, i}
    <div
      draggable="true"
      on:dragstart={(e) => dragStart(e, i)}
      on:dragover={dragOver}
      on:drop={(e) => drop(e, i)}
      style='display:flex; flex-direction:row; padding:0px; align-items:center; height:fit-content; border-radius:5px; {hovered == i? "background-color:#f3f3f3":""}'
      on:mouseenter={() => (hovered = i)}
    >
      <div style="flex:1">
        <svelte:component
          this={component.component}
          style="flex:1; width:fit-content"
          data={component}
          on:mouse
        />
      </div>
      {#if hovered == i}
        <div class="btn" transition:fade on:click={()=>addPallete(i)}>
          <Icon data={plus} style="margin-right:20px" />
        </div>
<!--         <div class="btn" transition:fade on:dragstart={(e)=>dragStart(e, i)}>
          <Icon data={alignCenter} style="margin-right:20px" />
        </div> -->
        <div
          class="btn"
          transition:fade
          on:click={() => deleteComponent(component)}
        >
          <Icon data={trash} style="margin-right:20px" />
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .btn {
    cursor: pointer;
    color: #999;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .btn:hover {
    cursor: pointer;
    color: #777;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>