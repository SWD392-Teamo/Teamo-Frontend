import { PagedResult, Skill } from "@/types"
import { create } from "zustand"

type State = {
    skill: Skill[]
    selectedSkill: Skill | null
}

type Actions = {
    setData: (data: Skill[]) => void
    setSelectedSkill: (selectedSkill: Skill) => void
}

const initialState: State = {
    skill: [],
    selectedSkill: null
}

export const useSkillStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: Skill[]) => {
        set(() => ({
            skill: data,
        }))
    },

    setSelectedSkill: (selectedSkill: Skill) => {
        set(() => ({
            selectedSkill: selectedSkill, 
        }));
    },
}))