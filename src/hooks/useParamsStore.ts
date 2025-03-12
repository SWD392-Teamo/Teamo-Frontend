import { create } from "zustand"

type State = {
    pageIndex: number
    pageSize: number
    search?: string
    majorId?: number
    subjectId?: number
    status?: string
    sort?: string
}

type Actions = {
    setParams: (params: Partial<State>) => void
    reset: () => void
}

const initialState: State = {
    pageIndex: 1,
    pageSize: 6,
}

export const useParamsStore = create<State & Actions>()((set) => ({
    ...initialState,

    // Set the state in the store with the new param value
    setParams: (newParams: Partial<State>) => {
        set((state) => {
            if (newParams.pageIndex) {
                return { ...state, pageIndex: newParams.pageIndex }
            } else {
                return { ...state, ...newParams, pageNumber: 1 }
            }
        })
    },

    // Reset state to initial state
    reset: () => set(initialState),
}))