import { Field, Major, PagedResult } from "@/types"
import { create } from "zustand"

type State = {
    fields: Field[]
    totalCount: number
    pageSize: number
}

type Actions = {
    setData: (data: PagedResult<Field>) => void
}

const initialState: State = {
    fields: [],
    pageSize: 0,
    totalCount: 0,
}

export const useFieldStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<Field>) => {
        set(() => ({
            fields: data.data,
            totalCount: data.count,
            pageSize: data.pageSize
        }))
    },
}))