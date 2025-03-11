import { PagedResult, Semester } from "@/types"
import { create } from "zustand"

type State = {
    semesters: Semester[]
    totalCount: number
    selectedSemester: Semester | null
}

type Actions = {
    setSemesters: (semester: PagedResult<Semester>) => void
    setSelectedSemester: (semester: Semester) => void
}

const initialState : State = {
    semesters: [],
    totalCount: 0,
    selectedSemester: null
}

export const useSemesterStore = create<State & Actions>()((set) => ({
    ...initialState,

    setSemesters: (semesters: PagedResult<Semester>) => {
        set(() => ({
            semesters: semesters.data,
            totalCount: semesters.count
        }))
    },

    setSelectedSemester: (semester: Semester) => {
        set(() => ({
            selectedSemester: semester,
        }))
    }

    
}))