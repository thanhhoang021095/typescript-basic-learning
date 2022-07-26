let unknownVar: unknown;
let anyVar: any;
let stringVar: string;

unknownVar = 5;
unknownVar = 'abc';

anyVar = unknownVar;

/**
 @ Anything can assign for unknown but 
 @ unknown can not be used to assign for anything (except any type)
 @ Error assignation is below
 */ 
// stringVar = unknownVar;