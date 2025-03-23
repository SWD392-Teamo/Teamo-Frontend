import { Subject, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    subjects: Subject[]
    totalCount: number
    pageSize: number
    selectedSubject: Subject | null
}

type Actions = {
    setData: (data: PagedResult<Subject>) => void
    setSelectedSubject: (subject: Subject) => void
}

const initialState: State = {
    subjects: [],
    pageSize: 0,
    totalCount: 0,
    selectedSubject: null,
}

export const useSubjectStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<Subject>) => {
        set(() => ({
            subjects: data.data,
            totalCount: data.count,
            pageSize: data.pageSize
        }))
    },
    
    setSelectedSubject(subject) {
        set(() => ({
            selectedSubject: subject
        }))
    },
}))