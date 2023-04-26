import type { SvelteComponent } from 'svelte';
import PalleteComponent from './PalleteComponent.svelte';
import { Component } from '../component';

export class Pallete extends Component {
  text: string;

  constructor(text: string = "") {
    super(PalleteComponent as typeof SvelteComponent, 'Pallete', 'This is a pallete component');
    this.text = text;
  }
}