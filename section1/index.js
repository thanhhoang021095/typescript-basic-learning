var myBtn = document.querySelector("button");
var ip1 = document.getElementById("input1");
var ip2 = document.getElementById("input2");
function addCalc(num1, num2) {
    alert(num1 + num2);
}
myBtn.addEventListener("click", function () {
    addCalc(+ip1.value, +ip2.value);
});
