import { Project, ProjectStatus } from "../models/project.js";

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    };
}

export class ProjectState extends State<Project> {
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

export const projectState = ProjectState.getInstance();