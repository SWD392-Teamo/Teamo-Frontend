export interface imgProps  {
   imgUrl: string;
}

export interface addSkillProfile {
   skillId: number,
   level: string,
}


export interface addLinkProfile {
   name: string,
   url: string
}

export interface addGroup {
   name:string,
   title:string, 
   semesterId: number,
   maxMember: number,
   fieldId: number,
   subjectId: number,
   groupPositions: addGroupPositions[],
}

export interface addGroupPositions {
   name: string, 
   count: number,
   skillIds: number[],
}