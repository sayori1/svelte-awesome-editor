import type { SvelteComponent } from 'svelte';
import HeaderComponent from './HeaderComponent.svelte';
import { Component } from '../component';

export class Header extends Component {
  level: number;
  text: string;

  constructor(level: number = 1, text: string = "Header") {
    super(HeaderComponent as typeof SvelteComponent, 'Header', 'This is a header component');
    this.level = level;
    this.text = text;
  }

  toJson(): object {
    return { name: this.name, level: this.level, text: this.text };
  }

  static fromJson(json: { name: string, level: number, text: string }): Header {
    return new Header(json.level, json.text);
  }
}
