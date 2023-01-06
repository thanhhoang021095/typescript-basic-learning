// Interfaces
interface Draggable {
    dragStartHandler(e: DragEvent): void;
    dragEndHandler(e: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(e: DragEvent): void
    dropHandler(e: DragEvent): void
    dragLeaveHandler(e: DragEvent): void
}

enum ProjectStatus {
    Active,
    Finished
}
class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus,
    ) { }
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    };
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    };

    addProject(title: string, desc: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            desc,
            numOfPeople,
            ProjectStatus.Active
        );

        this.projects.push(newProject);

        this.updateListeners();
    };

    moveProject(prjId: string, newStatus: ProjectStatus) {
        const movedProject = this.projects.find(p => p.id === prjId);
        if (movedProject && movedProject.status !== newStatus) {
            movedProject.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (let listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElm: HTMLTemplateElement;
    hostElm: T;
    element: U;

    constructor(
        templateId: string,
        hostElmId: string,
        insertPos: InsertPosition,
        newElmId?: string,
    ) {
        this.templateElm = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElm = document.getElementById(hostElmId)! as T;

        const importedNode = document.importNode(this.templateElm.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElmId) this.element.id = newElmId;

        this.attach(insertPos);
    }

    private attach(pos: InsertPosition) {
        this.hostElm.insertAdjacentElement(pos, this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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

// Decorators
function AutoBindEvent(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originMethod = descriptor.value;
    const configDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originMethod.bind(this);
        }
    }
    return configDescriptor
}

// Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;

    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }

    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    if (validatableInput.min != null && typeof validatableInput.value == 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if (validatableInput.max != null && typeof validatableInput.value == 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
}

const project = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');