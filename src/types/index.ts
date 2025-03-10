import { GroupPositionStatus, GroupStatus } from './enum';

export type PagedResult<T> = {
    data: T[]
    pageIndex: number
    pageSize: number
    count: number
}

export type Subject = {
    id: number
    code: string
    name: string
    description: string
    createdDate: string
}

export type Major = {
    id: number;
    code: string;
    name: string;
    createdDate: Date;
}

export type Skill = {
    id: number;
    name: string;
    type: string;
    level: string;
}

export type Field = {
    id: number;
    name: string;
    description: string;
}


export type GroupPosition = {
    id: string;
    name: string;
    count: number;
    status: GroupPositionStatus;
}

export type GroupMember = {
    groupId: number;
    studentId: number;
    studentName: string;
    studentEmail: string;
    imgUrl: string;
    positions: string[];
    role: string;
}

export type Application = {
    id: number;
    groupId: number;
    groupName: string;
    studentName: string;
    studentEmail: string;
    imgUrl: string;
    requestTime: Date;
    requestContent: string;
    groupPositionName: string;
    status: string;
}

export type Group = {
    id: number;
    name: string;
    title: string;
    semesterName: string;
    description: string;
    createdAt: Date;
    createdByUserName: string;
    maxMember: number;
    groupMembers: GroupMember[];
    status: GroupStatus;
    fieldName: string;
    subjectCode: string;
    totalMembers: number;
    totalGroupPositions: number;
    totalApplications: number;
    groupPositions: GroupPosition[];
    applications: Application[];
}

export type User = {
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    gender: string;
    dob: Date;
    phone: string;
    imgUrl: string;
    status: string;
    description: string;
    majorCode: string;
    links: Contact[];
    studentSkills: StudentSkill[];
}

export type StudentSkill = {
    id: number;
    skillName: string;
    skillType: string;
    skillLevel: string;
}

export type Contact = {
    id: number;
    name: string;
    url: string;
}