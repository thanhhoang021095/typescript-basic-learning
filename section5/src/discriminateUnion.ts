interface Bird {
    type: "bird";
    flySpeed: number;
}

interface Horse {
    type: "horse";
    runSpeed: number;
}

type SpeedAnimal = Bird | Horse;

function moveAnimal(animal: SpeedAnimal) {
    let speed: number;
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
};

moveAnimal({ type: "bird", flySpeed: 100 })