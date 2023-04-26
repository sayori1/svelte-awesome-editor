import type { SvelteComponent } from 'svelte';

export abstract class Component {
  component: typeof SvelteComponent;
  name: string;
  description: string;

  constructor(component: typeof SvelteComponent, name: string, description: string) {
    this.component = component;
    this.name = name;
    this.description = description;
  }

  toJson(): object {
    return { name: this.name };
  }

  static fromJson(json:any):Component{
    throw json['name'] + ' toJson method is unimplemented'
  }
}

