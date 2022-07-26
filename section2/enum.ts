enum Role {
    ADMIN = 1,
    USER = 2,
    READ_ONLY = 'READ_ONLY'
}

const person = {
    name: "Maxi",
    role: Role.READ_ONLY
}

if (person.role === Role.ADMIN) {
    console.log('authenticated');
} else {
    console.log('Invalid user');
}

