import { PagedResult, User } from "@/types"
import { create } from "zustand"

type State = {
    users: User[]
    totalCount: number
    pageSize: number
    selectedUser: User | null
}

type Actions = {
    setData: (data: PagedResult<User>) => void
    setSelectedUser: (user: User) => void
}

const initialState: State = {
    users: [],
    pageSize: 6,
    totalCount: 0,
    selectedUser: null,
}

export const useUserstore = create<State & Actions>((set) => ({
    ...initialState,

    setData: (data: PagedResult<User>) => {
        set(() => ({
            users: data.data,
            totalCount: data.count,
            pageSize: data.pageSize
        }))
    },
    
    setSelectedUser(user) {
        set(() => ({
            selectedUser: user
        }))
    },
}))