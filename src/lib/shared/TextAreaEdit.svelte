<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
    import { text } from 'svelte/internal';
  
	export let value:any; 
	export let required:boolean = true
	export let editing = false; 
	export let auto = true;
	export let placeholder = "";
	export let autofocus = false;
	let original:any;
  
	const dispatch = createEventDispatcher()

	let textarea:HTMLElement;
  
	function autoResize() {
		if(textarea == null) return;
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
	}

	onMount(() => {
	  editing = true;
	  original = value
	  autoResize();
	  editing = false;
	})
  
	function edit() {
	  if(!auto) return;
	  editing = true
	  value+='';
	}
  
	function submit() {
		if (value != original) {
			dispatch('submit', value)
		}
	  editing = false
	}
  
	function keydown(event:any) {
	  if (event.key == 'Escape') {
		event.preventDefault()
		value = original
		editing = false
	  }

/* 	  if(event.key == 'Enter'){
		editing = false;
	  } */
	}

	function onInput(event:any){
		autoResize();
		dispatch('input', value);
	}
	
	  function focus(element:any) {
		  element.focus()	
	  }


  </script>
  
<div class="multiline_text">
	<form on:submit|preventDefault={submit} on:keydown={keydown} >
		<textarea {autofocus} bind:this={textarea} bind:value on:blur={submit} {required} use:focus {placeholder} on:input={onInput} rows="1" />
	</form>
</div>

<svelte:body on:keydown={keydown}></svelte:body>


  <style>
	textarea {
	  all:inherit;
	  width:100%;
	  overflow: hidden;
	  border: none;
	  background: none;
	  font-size: inherit;
	  color: inherit;
	  font-weight: inherit;
	  text-align: inherit;
	  box-shadow: none;
	  padding:0;
	  margin:0;
	}
	textarea:focus {
	  all:inherit;
	  width:100%;
	  overflow: hidden;
	  border: none;
	  background: none;
	  font-size: inherit;
	  color: inherit;
	  font-weight: inherit;
	  text-align: inherit;
	  box-shadow: none;
	  padding:0;
	  margin:0;
	}
	.multiline_text {
		width:100%;
		white-space: pre-wrap; /* Preserve line breaks and spaces */
		word-wrap: break-word; /* Break long words if necessary */
 	 }
  </style>