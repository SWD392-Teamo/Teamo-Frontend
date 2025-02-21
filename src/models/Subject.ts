import { Major } from "@/types";
import { Field } from "./Field";
<<<<<<< HEAD:src/app/models/Subject.ts
import { Major } from "@/types";
=======
>>>>>>> 35a39d65bcd9dd48779f3bc5134f5cb9a653dc76:src/models/Subject.ts

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