


import { Draggable } from '../models/drag-drop.js';
import { Project } from '../models/project.js';
import Component from './base-component.js';
import { AutoBindEvent } from '../decorators/autobind.js';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        return this.project.people === 1 ? '1 person' : `${this.project.people} persons`
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, 'beforeend', project.id);
        this.project = project;

        this.renderContent();
        this.configure();
    }

    @AutoBindEvent
    dragStartHandler(e: DragEvent): void {
        e.dataTransfer!.setData('text/plain', this.project.id);
        e.dataTransfer!.effectAllowed = 'move';
    }

    @AutoBindEvent
    dragEndHandler(_e: DragEvent): void { }

    @AutoBindEvent
    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragstart', this.dragEndHandler);
    }

    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}