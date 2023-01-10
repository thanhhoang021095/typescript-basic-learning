export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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

        const importedNode = document.importNode(
            this.templateElm?.content,
            true
          );
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