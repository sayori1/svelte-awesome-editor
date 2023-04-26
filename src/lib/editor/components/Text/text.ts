import type { SvelteComponent } from 'svelte';
import TextComponent from './TextComponent.svelte';
import { Component } from '../component';

export class Text extends Component {
  text: string;

  constructor(text: string = "") {
    super(TextComponent as typeof SvelteComponent, 'Text', 'This is a text component');
    this.text = text;
  }

  toJson(): object {
    return { name: this.name, text: this.text };
  }

  static fromJson(json: { name: string, text: string }): Text {
    return new Text(json.text);
  }
}
