<script lang="ts">
  import type { Pallete } from "./pallete";
  import {ContextMenu, MenuOption, MenuDivider } from "context-menu-svelte";
  import { Header } from "../Header/header";
  import { Text } from "../Text/text";
  import { getContext, onMount } from "svelte";
  import type { EditorContext } from "../../editorContext";
  import type { Component } from "../component";
  import TextAreaEdit from "$lib/shared/TextAreaEdit.svelte";

  export let data: Pallete;

  let showMenu = false;
  let menuX = 0;
  let menuY = 0;

  function updatePosition() {
    const el = document.getElementById("inplace-edit");
    if (el) {
      const rect = el.getBoundingClientRect();
      menuX = rect.left;
      menuY = rect.bottom - 15;
    }
  }

  function onInputValue(value: string) {
    if (value[0] == "/") {
      updatePosition();
      showMenu = true;
    } else {
      showMenu = false;
    }
  }

  let { addComponent, deleteComponent, swap, enter } = getContext(
    "editor"
  ) as EditorContext;

  function onAddComponent(c: Component) {
    swap(data, c);
  }

  function keydown(event: any) {
    if(event.ctrlKey){
      swap(data, new Text(data.text));
    }
    if(event.key == "Enter"){
      swap(data, new Text(data.text));
    }
    if (event.key == "Escape") {
      deleteComponent(data);
    }
    if (event.key == "Backspace" && data.text.length == 0) {
      deleteComponent(data);
    }
  }



</script>

<div id="inplace-edit">
  <p>
    <TextAreaEdit
      autofocus={true}
      bind:value={data.text}
      placeholder={"Write / to get all components"}
      on:input={(e) => onInputValue(e.detail)}
    />
  </p>
</div>

<ContextMenu {showMenu} x={menuX} y={menuY} auto={false}>
  <MenuOption on:click={() => onAddComponent(new Header())} text="Header" />
  <MenuDivider />
  <MenuOption on:click={() => onAddComponent(new Text())} text="Text" />
</ContextMenu>

<svelte:body on:keydown|stopPropagation={keydown}></svelte:body>

<style>
  p{
    margin-top:5px;
    margin-bottom:5px;
  }
</style>
