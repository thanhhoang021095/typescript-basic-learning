var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from './base-component.js';
import { projectState } from '../state/project-state.js';
import { AutoBindEvent } from '../decorators/autobind.js';
import { ProjectStatus } from '../models/project.js';
import { ProjectItem } from './project-item.js';
export class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', 'beforeend', `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(e) {
        if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
            e.preventDefault();
            const listElm = this.element.querySelector('ul');
            listElm.classList.add('droppable');
        }
    }
    dropHandler(e) {
        const droppedProjectId = e.dataTransfer.getData('text/plain');
        projectState.moveProject(droppedProjectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(_e) {
        if (this.element) {
            const listElm = this.element.querySelector('ul');
            listElm.classList.remove('droppable');
        }
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter((prj) => prj.status === (this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished));
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderProjects() {
        const listElm = document.getElementById(`${this.type}-projects-list`);
        listElm.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul').id, projectItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}
__decorate([
    AutoBindEvent
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    AutoBindEvent
], ProjectList.prototype, "dropHandler", null);
__decorate([
    AutoBindEvent
], ProjectList.prototype, "dragLeaveHandler", null);
__decorate([
    AutoBindEvent
], ProjectList.prototype, "configure", null);
//# sourceMappingURL=project-list.js.map