import { Subject, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    subjects: Subject[]
    totalCount: number
    pageCount: number
}

type Actions = {
    setData: (data: PagedResult<Subject>) => void
}

const initialState: State = {
    subjects: [],
    pageCount: 0,
    totalCount: 0
}

export const useSubjectStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<Subject>) => {
        set(() => ({
            subjects: data.results,
            totalCount: data.totalCount,
            pageCount: data.pageCount
        }))
    }
}))