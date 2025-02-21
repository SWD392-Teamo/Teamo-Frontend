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

export type GroupGeneral = {
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
}