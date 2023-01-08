import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    ;
}
export class ProjectState extends State {
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
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map