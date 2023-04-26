<script lang="ts">
    import { getContext } from "svelte";
    import type { EditorContext } from "../../editorContext";
    import type { Text } from "./text";
    import TextAreaEdit from "$lib/shared/TextAreaEdit.svelte";
    export let data: Text;

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
  </script>
  

<p>
  <TextAreaEdit 
  bind:value={data.text} placeholder="Start writing..."></TextAreaEdit>
</p>
  
<svelte:body on:keydown={keydown}></svelte:body>

<style>
  p{
    margin-top:5px;
    margin-bottom:5px;
  }
</style>