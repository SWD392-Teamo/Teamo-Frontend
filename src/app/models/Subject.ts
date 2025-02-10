import { Field } from "./Field";
import { Major } from "./Major";

export interface Subject {
   id: number;
   code: string;
   name: string;
   description: string;
   createdDate: Date;
   major: Major[];
   field: Field[];
}


export interface SubjectList {
   subject: Subject[]
}