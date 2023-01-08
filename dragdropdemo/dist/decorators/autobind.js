export function AutoBindEvent(_target, _methodName, descriptor) {
    const originMethod = descriptor.value;
    const configDescriptor = {
        configurable: true,
        get() {
            return originMethod.bind(this);
        }
    };
    return configDescriptor;
}
//# sourceMappingURL=autobind.js.map