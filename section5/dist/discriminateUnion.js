"use strict";
function moveAnimal(animal) {
    var speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flySpeed;
            break;
        case "horse":
            speed = animal.runSpeed;
            break;
        default:
            speed = 0;
            break;
    }
    console.log("Moving with speed " + speed);
}
;
moveAnimal({ type: "bird", flySpeed: 100 });
//# sourceMappingURL=discriminateUnion.js.map