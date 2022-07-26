const myBtn = document.querySelector("button") as HTMLButtonElement; 
const ip1 = document.getElementById("input1")! as HTMLInputElement; 
const ip2 = document.getElementById("input2")! as HTMLInputElement;

function addCalc(num1:number, num2:number) {
    alert(num1 + num2);
}

myBtn.addEventListener("click", () => { 
    addCalc(+ip1.value, +ip2.value);
});
