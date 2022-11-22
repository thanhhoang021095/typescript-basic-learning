function Logger(logString: string) {
  console.log('[Function -- Logger]: log out first');
  // Decorator Factory
  return function (constructor: Function) {
    console.log('[Factory -- Logger]: log out after');
    console.log(logString);
    console.log('new custom class: ', constructor);
  }
}

function UseTemplate(template: string, hookId: string) {
  console.log('[Function -- UseTemplate]: log out after');
  // Decorator Factory
  return function <T extends { new(...args: any[]): { name: string } }>(
    originConstructor: T
  ) {
    console.log('[Factory -- UseTemplate]: log out first');

    return class extends originConstructor {
      constructor(..._args: any []) {
        super();
        const rootElm = document.getElementById(hookId)! as HTMLElement;
        const newPerson = new originConstructor();
        rootElm.innerHTML = template;
        const h1Elm = document.querySelector('h1')! as HTMLElement;
        h1Elm.textContent += " " + newPerson?.name ?? "";
      }
    }
  }
}

console.log(`================== Notes ==================`);
console.log(`Function Decorator will run from top -> bottom.`);
console.log(`But Decorator Factory will run from bottom -> top`);
console.log(`===========================================`);
console.log('\n');

@Logger("LOGGING - PERSON")
@UseTemplate("<h1>Hello</h1>", "app")

class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();

console.log(person);