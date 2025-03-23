import { PagedResult, Skill } from "@/types"
import { create } from "zustand"

type State = {
    skills: Skill[]
    totalCount: number
    pageSize: number
}

type Actions = {
    setData: (data: PagedResult<Skill>) => void
}

const initialState: State = {
    skills: [],
    pageSize: 0,
    totalCount: 0,
}

export const useSkillStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<Skill>) => {
        set(() => ({
            skills: data.data,
            totalCount: data.count,
            pageSize: data.pageSize
        }))
    },
}))