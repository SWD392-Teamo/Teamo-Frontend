import { Major, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    majors: Major[]
    totalCount: number
    pageCount: number
    selectedMajor: Major | null
}

type Actions = {
    setData: (data: PagedResult<Major>) => void
    setSelectedMajor: (major: Major) => void
}

const initialState: State = {
    majors: [],
    pageCount: 0,
    totalCount: 0,
    selectedMajor: null
}

export const useMajorStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<Major>) => {
        set(() => ({
            majors: data.data,
            totalCount: data.count,
            pageCount: data.pageSize
        }))
    },

    setSelectedMajor: (major: Major) => {
        set(() => ({
            selectedMajor: major, 
        }));
    },
}))