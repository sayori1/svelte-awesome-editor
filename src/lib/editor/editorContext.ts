import type { Component } from "./components/component";

export class EditorContext{
    addComponent: (c: Component) => void;
    deleteComponent: (c: Component) => void;
    enter: (c: Component) => void;
    swap: (a: Component, b: Component) => void;

    constructor(onAddComponent: (c: Component) => void, onDeleteComponent: (c: Component) => void, onEnter: (c: Component) => void, swap: (a: Component, b: Component) => void) {
        this.addComponent = onAddComponent;
        this.deleteComponent = onDeleteComponent;
        this.enter = onEnter;
        this.swap = swap;
    }
}
