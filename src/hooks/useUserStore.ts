import { PagedResult, User } from "@/types"
import { create } from "zustand"

type State = {
    users: User[]
    totalCount: number
    pageSize: number
    selectedUser: number
}

type Actions = {
    setData: (data: PagedResult<User>) => void
    setSelectedUser: (id: number) => void
}

const initialState: State = {
    users: [],
    pageSize: 6,
    totalCount: 0,
    selectedUser: 0,
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
    
    setSelectedUser(id) {
        set(() => ({
            selectedUser: id
        }))
    },
}))