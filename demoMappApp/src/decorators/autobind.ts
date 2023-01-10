// Decorators
export function AutoBindEvent(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originMethod = descriptor.value;
    const configDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originMethod.bind(this);
        }
    }
    return configDescriptor
}