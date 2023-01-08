var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { validate } from '../utils/validation.js';
import Component from './base-component.js';
import { projectState } from '../state/project-state.js';
import { AutoBindEvent } from '../decorators/autobind.js';
export class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', 'afterbegin', 'user-input');
        this.templateElm = document.getElementById('project-input');
        this.titleInputElm = this.element.querySelector('#title');
        this.descInputElm = this.element.querySelector('#description');
        this.peopleInputElm = this.element.querySelector('#people');
        this.configure();
    }
    gatherUserInput() {
        const titleVal = this.titleInputElm.value;
        const descVal = this.descInputElm.value;
        const peopleVal = this.peopleInputElm.value;
        const titleValidatable = {
            value: titleVal, required: true, minLength: 5
        };
        const descValidatable = {
            value: descVal, required: true, minLength: 5
        };
        const peopleValidatable = {
            value: +peopleVal, required: true, min: 1, max: 5
        };
        if (!validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)) {
            alert('Invalid input, please try again');
            return;
        }
        else {
            return [titleVal, descVal, +peopleVal];
        }
    }
    clearInput() {
        this.titleInputElm.value = '';
        this.descInputElm.value = '';
        this.peopleInputElm.value = '';
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInput();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    ;
    renderContent() { }
}
__decorate([
    AutoBindEvent
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map