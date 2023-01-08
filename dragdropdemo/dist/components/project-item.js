var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from './base-component.js';
import { AutoBindEvent } from '../decorators/autobind.js';
export class ProjectItem extends Component {
    constructor(hostId, project) {
        super('single-project', hostId, 'beforeend', project.id);
        this.project = project;
        this.renderContent();
        this.configure();
    }
    get persons() {
        return this.project.people === 1 ? '1 person' : `${this.project.people} persons`;
    }
    dragStartHandler(e) {
        e.dataTransfer.setData('text/plain', this.project.id);
        e.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_e) { }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragstart', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons + ' assigned';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    AutoBindEvent
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    AutoBindEvent
], ProjectItem.prototype, "dragEndHandler", null);
__decorate([
    AutoBindEvent
], ProjectItem.prototype, "configure", null);
//# sourceMappingURL=project-item.js.map