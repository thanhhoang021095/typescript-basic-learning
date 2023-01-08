

import Component from './base-component.js';
import { projectState } from '../state/project-state.js';
import { AutoBindEvent } from '../decorators/autobind.js';
import { DragTarget } from '../models/drag-drop.js';
import { Project, ProjectStatus } from '../models/project.js';
import { ProjectItem } from './project-item.js';

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', 'beforeend', `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @AutoBindEvent
    dragOverHandler(e: DragEvent): void {
        if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
            e.preventDefault();
            const listElm = this.element.querySelector('ul')!;
            listElm.classList.add('droppable');
        }
    }

    @AutoBindEvent
    dropHandler(e: DragEvent): void {
        const droppedProjectId = e.dataTransfer!.getData('text/plain');
        projectState.moveProject(
            droppedProjectId,
            this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
        );
    }

    @AutoBindEvent
    dragLeaveHandler(_e: DragEvent): void {
        if (this.element) {
            const listElm = this.element.querySelector('ul')!;
            listElm.classList.remove('droppable');
        }
    }

    @AutoBindEvent
    configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((prj: Project) =>
                prj.status === (this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished));
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderProjects() {
        const listElm = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listElm.innerHTML = '';

        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
        }
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}