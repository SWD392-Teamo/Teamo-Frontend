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