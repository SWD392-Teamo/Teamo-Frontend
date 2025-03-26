export interface imgProps {
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
   name: string,
   title: string,
   semesterId: number,
   maxMember: number,
   fieldId: number,
   subjectId: number,
   description: string,
   groupPositions: addGroupPositions[],
}

export interface addGroupPositions {
   name: string,
   count: number,
   skillIds: number[],
}

export interface addGroupMembers {
   studentId: number,
   groupPositionIds: number[]
}

export interface editGroupPositions {
   name: string,
   count: number,
   status: string, //Open, Closed, Deleted
   skillIds: number[],
}

export interface editMember {
   role: string, //Leader, Member
   groupPositionIds: number[],
}