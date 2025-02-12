import { Major, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    majors: Major[]
    totalCount: number
    pageCount: number
}

type Actions = {
    setData: (data: PagedResult<Major>) => void
}

const initialState: State = {
    majors: [],
    pageCount: 0,
    totalCount: 0
}

export const useMajorStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<Major>) => {
        set(() => ({
            majors: data.data,
            totalCount: data.count,
            pageCount: data.pageSize
        }))
    }
}))