"use server"
import { fetchWrapper } from "@/lib/fetchWrapper"
import { PagedResult, Post } from "@/types"

export async function getPostData(query: string): Promise<PagedResult<Post>> {
   return await fetchWrapper.get(`posts${query}`);
}

export async function getPostByGroup(groupId: number, query: string): Promise<PagedResult<Post>> {
   return await fetchWrapper.get(`groups/${groupId}/posts${query}`);
}

export async function createPost(groupId: number, formData: FormData): Promise<Post> {
   return await fetchWrapper.post(`groups/${groupId}/posts`, formData)
}

export async function updatePost(groupId: number, postId: number, formData: FormData): Promise<Post> {
   return await fetchWrapper.patch(`groups/${groupId}/posts/${postId}`, formData)
}

export async function deletePost(groupId: number, postId: number): Promise<Post> {
   return await fetchWrapper.del(`groups/${groupId}/posts/${postId}`)
}