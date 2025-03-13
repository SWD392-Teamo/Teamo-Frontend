import { GroupPositionStatus, GroupStatus } from './enum';

export type PagedResult<T> = {
    data: T[]
    count: number
    pageSize: number
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
    imgUrl: string;
    createdDate: Date;
}

export type Skill = {
    id: number;
    name: string;
    type: string;
}

export type Field = {
    id: number;
    name: string;
    description: string;
}

export type Application = {
    id: number
    groupId: number
    groupName: string
    studentName: string
    studentEmail: string
    imgUrl: string
    requestTime: string
    requestContent: string
    documentUrl: string
    groupPositionName: string
    status: string
  }

export type GroupPosition = {
    id: number;
    name: string;
    count: number;
    status: string;
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

export type Group = {
    id: number;
    name: string;
    title: string;
    semesterName: string;
    description: string;
    createdAt: string;
    createdByUserName: string;
    maxMember: number;
    imgUrl: string;
    groupMembers: GroupMember[];
    status: string;
    fieldName: string;
    subjectCode: string;
    totalMembers: number;
    totalGroupPositions: number;
    totalApplications: number;
    groupPositions: GroupPosition[];
    applications: Application[];
}

export type Semester = {
    id: number,
    name: string,
    code: string,
    status: string
}

export type User = {
    id: number,
    code: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    dob: string,
    imgUrl: string,
    description: string,
    majorCode: string,
    links: Link[];
    studentSkills: StudentSkill[],
}

export type Link = {
    id: number,
    name: string,
    url: string
}

export type StudentSkill = {
    id: number,
    skillName: string,
    skillType: string,
    skillLevel: string,
}