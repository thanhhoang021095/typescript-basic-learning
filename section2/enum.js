var Role;
(function (Role) {
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["USER"] = 2] = "USER";
    Role["READ_ONLY"] = "READ_ONLY";
})(Role || (Role = {}));
var person = {
    name: "Maxi",
    role: Role.READ_ONLY
};
if (person.role === Role.ADMIN) {
    console.log('authenticated');
}
else {
    console.log('Invalid user');
}
