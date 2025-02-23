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

export type Application = {
    id: number
    groupId: number
    groupName: string
    studentName: string
    studentEmail: string
    imgUrl: string
    requestTime: string
    requestContent: string
    groupPositionName: string
    status: string
  }