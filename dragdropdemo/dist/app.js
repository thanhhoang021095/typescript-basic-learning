"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    ;
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    }
    ;
    addProject(title, desc, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, desc, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    ;
    moveProject(prjId, newStatus) {
        const movedProject = this.projects.find(p => p.id === prjId);
        if (movedProject && movedProject.status !== newStatus) {
            movedProject.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (let listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
class Component {
    constructor(templateId, hostElmId, insertPos, newElmId) {
        this.templateElm = document.getElementById(templateId);
        this.hostElm = document.getElementById(hostElmId);
        const importedNode = document.importNode(this.templateElm.content, true);
        this.element = importedNode.firstElementChild;
        if (newElmId)
            this.element.id = newElmId;
        this.attach(insertPos);
    }
    attach(pos) {
        this.hostElm.insertAdjacentElement(pos, this.element);
    }
}
class ProjectItem extends Component {
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
class ProjectList extends Component {
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
class ProjectInput extends Component {
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
function AutoBindEvent(_target, _methodName, descriptor) {
    const originMethod = descriptor.value;
    const configDescriptor = {
        configurable: true,
        get() {
            return originMethod.bind(this);
        }
    };
    return configDescriptor;
}
function validate(validatableInput) {
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
//# sourceMappingURL=app.js.map