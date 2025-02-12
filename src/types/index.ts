export type PagedResult<T> = {
    results: T[]
    pageCount: number
    totalCount: number
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