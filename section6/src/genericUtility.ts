interface IStudentInfo {
    name: string;
    age: number,
    startDate: Date,
}
function createStudentInfo (
    name: string,
    age: number,
    startDate: Date,
): IStudentInfo {
    let studentInfo: Partial<IStudentInfo> = {};
    studentInfo.name = name;
    studentInfo.age = age;
    studentInfo.startDate = startDate;
    return studentInfo as IStudentInfo;
}
