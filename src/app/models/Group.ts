import { Field } from "./Field";
import { Semester } from "./Semester";

export interface Group {
   id: number;
   name: string;
   title: string;
   semester: Semester;
   description: string;
   createdAt: Date;
   // createdBy: ;
   maxMember: number;
   // groupMembers: [];
   status: string;
   field: Field;

}