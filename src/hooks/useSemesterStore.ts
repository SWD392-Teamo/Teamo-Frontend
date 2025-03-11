import { PagedResult, Semester } from "@/types"
import { create } from "zustand"

type State = {
    semesters: Semester[]
    totalCount: number
    selectedSemester: Semester | null
}

type Actions = {
    setSemesters: (semester: PagedResult<Semester>) => void
    setSelectedSemester: (semester: Semester | null) => void
}

const initialState : State = {
    semesters: [],
    totalCount: 0,
    selectedSemester: null
}

export const useSemesterStore = create<State & Actions>()((set) => ({
    ...initialState,

    setSemesters: (semesters: PagedResult<Semester>) => {
        const activeSemester = semesters.data.find((s) => s.status === "Ongoing") || semesters.data[0];
        console.log("active semester "+ activeSemester.name);
        set(() => ({
            semesters: semesters.data,
            totalCount: semesters.count,
            selectedSemester: activeSemester
        }))
    },

    setSelectedSemester: (semester: Semester | null) => {
        set(() => ({
            selectedSemester: semester,
        }))
    }

    
}))