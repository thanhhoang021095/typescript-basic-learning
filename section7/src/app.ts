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
        console.log('[Rendering Template]');
        const rootElm = document.getElementById(hookId)! as HTMLElement; 
        rootElm.innerHTML = template;
        const h1Elm = document.querySelector('h1')! as HTMLElement;
        h1Elm.textContent += " " + this.name ?? "";
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
    console.log('Constructor creating person object...');
  }
}

const person = new Person();

console.log('[Class Instance]: ', person);

/* ==== Rewrite logic with Method Decorators ==== */

function AutoBindInstance(_target: any, _methodName: string, descriptor: PropertyDescriptor): any {
  const originMethod = descriptor.value;
  console.log('[test]', descriptor, originMethod);
  const adjustDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originMethod.bind(this);
    },
  }
  return adjustDescriptor;
}

class Printer {
  message = "Trigger Button Success";

  @AutoBindInstance
  showMessage() {
    console.log('\n');
    console.log(`============== Rewrite logic with Method Decorators ===============`);
    console.log(this.message);
    console.log('=================================================');
    console.log('\n');
  }
}

const pt = new Printer();

const btn = document.querySelector("button")!;
btn.addEventListener("click", pt.showMessage);

/* ==== Validation with Decorators ==== */
interface ValidatorConfig {
  [property: string]: {
    [validatorProps: string]: string[], // ['required', 'positive']
  }
}
const registerValidators: ValidatorConfig = {}

function RequiredString(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: [...(registerValidators[target.constructor.name]?.[propName] ?? []), 'required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: [...(registerValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  }
}

function validateForm(obj: any) {
  const objValidatorConfig = registerValidators[obj.constructor.name];
  
  if (!objValidatorConfig) return true;

  let isValid = true;
  for (let prop in objValidatorConfig) {
    for (let validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
        default:
          break;
      }
    }
  }
  
  return isValid;
}

class Course {
  @RequiredString
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}


const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log('\n');
  console.log(`============== Validation with Decorators ===============`); 
  
  const titleElm = document.getElementById("title") as HTMLInputElement;
  const priceElm = document.getElementById("price") as HTMLInputElement;

  const titleVal = titleElm.value;
  const priceVal = +priceElm.value;

  const course = new Course(titleVal, priceVal);

  if (!validateForm(course)) {
    alert('Invalid input');
    return;
  } else {
    console.log('[Course]', course);
  }
})