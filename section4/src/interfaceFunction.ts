interface IAddFunc {
    (n1:number, n2:number): number
}

let addFunc: IAddFunc;
addFunc = (n1, n2) => n1+n2;
console.log(addFunc(3,5));
