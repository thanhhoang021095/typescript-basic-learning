export default class Component {
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
//# sourceMappingURL=base-component.js.map