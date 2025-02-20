import { Subject, PagedResult, GroupGeneral } from "@/types"
import { create } from "zustand"

type State = {
   groups: GroupGeneral[]
   totalCount: number
   pageCount: number
}

type Actions = {
   setData: (data: PagedResult<GroupGeneral>) => void
}

const initialState: State = {
   groups: [],
   totalCount: 0,
   pageCount: 0
}

export const useGroupStore = create<State & Actions>((set) => ({
   ...initialState,

   setData: (data: PagedResult<GroupGeneral>) => {
      set(() => ({
         groups: data.data,
         totalCount: data.count,
         pageCount: data.pageSize
      }))
   },
}))