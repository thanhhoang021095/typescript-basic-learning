import { Validatable, validate } from '../utils/validation.js';
import Component from './base-component.js';
import { projectState } from '../state/project-state.js';
import { AutoBindEvent } from '../decorators/autobind.js';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElm: HTMLInputElement;
    descInputElm: HTMLInputElement;
    peopleInputElm: HTMLInputElement;

    constructor() {
        super('project-input', 'app', 'afterbegin', 'user-input');
        this.templateElm = document.getElementById('project-input')! as HTMLTemplateElement;
        this.titleInputElm = this.element.querySelector('#title')! as HTMLInputElement;
        this.descInputElm = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElm = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
        const titleVal = this.titleInputElm.value;
        const descVal = this.descInputElm.value;
        const peopleVal = this.peopleInputElm.value;

        const titleValidatable: Validatable = {
            value: titleVal, required: true, minLength: 5
        }
        const descValidatable: Validatable = {
            value: descVal, required: true, minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: +peopleVal, required: true, min: 1, max: 5
        }

        if (
            !validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again');
            return;
        } else {
            return [titleVal, descVal, +peopleVal]
        }
    }

    private clearInput() {
        this.titleInputElm.value = ''
        this.descInputElm.value = ''
        this.peopleInputElm.value = ''
    }

    @AutoBindEvent
    private submitHandler(e: Event) {
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
    };

    renderContent(): void { }
}