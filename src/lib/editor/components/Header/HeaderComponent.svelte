<script lang="ts">
    import { getContext } from "svelte";
    import type { Header } from "./header";
    import type { Component } from "../component";
    import type { EditorContext } from "../../editorContext";
    import TextAreaEdit from "$lib/shared/TextAreaEdit.svelte";

  export let data: Header;
  let { deleteComponent, enter } = getContext(
    "editor"
  ) as EditorContext;

  function keydown(event: any) {
    if (event.key == "Backspace" && data.text.length == 0) {
      deleteComponent(data);
    }
    if(event.ctrlKey && event.key == "Enter"){
      enter(data);
    }
  }

  $:level = data.level.toString();
</script>

   <h1>
    <TextAreaEdit bind:value={data.text} placeholder="Header"></TextAreaEdit>
  </h1>
  
  <svelte:body on:keydown={keydown}></svelte:body>

  <style>
  </style>
