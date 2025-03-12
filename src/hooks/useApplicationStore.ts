import { Application, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    applications: Application[]
    totalCount: number
    pageSize: number
}

type Actions = {
    setData: (data: PagedResult<Application>) => void
}

const initialState: State = {
    applications: [],
    pageSize: 0,
    totalCount: 0
}

export const useApplicationStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<Application>) => {
        set(() => ({
            applications: data.data,
            totalCount: data.count,
            pageSize: data.pageSize
        }))
    }
}))