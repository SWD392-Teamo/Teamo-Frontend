import { PagedResult, Post } from "@/types"
import { create } from "zustand"

type State = {
   posts: Post[]
   totalCount: number
   pageSize: number
   selectedPost: Post | null
}

type Actions = {
   setData: (data: PagedResult<Post>) => void
   setSelectedPost: (post: Post) => void
}

const initialState: State = {
   posts: [],
   pageSize: 0,
   totalCount: 0,
   selectedPost: null
}

export const usePostStore = create<State & Actions>((set) => ({
   ...initialState,

   setData: (data: PagedResult<Post>) => {
      set(() => ({
         posts: data.data,
         totalCount: data.count,
         pageSize: data.pageSize
      }))
   },

   setSelectedPost: (post: Post) => {
      set(() => ({
         selectedPost: post,
      }));
   },
}))