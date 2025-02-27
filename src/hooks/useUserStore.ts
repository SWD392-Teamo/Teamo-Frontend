import { User } from "@/types"
import { create } from "zustand"

type State = {
    user: User | null
}

type Actions = {
    setData: (data: User) => void
}

const initialState: State = {
    user: null
}

export const useUserStore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: User) => {
        set(() => ({
            user: data
        }))
    }
}))