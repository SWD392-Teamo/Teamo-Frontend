"use server"
import { fetchWrapper } from "@/lib/fetchWrapper"
import { PagedResult, Post } from "@/types"

export async function getData(): Promise<PagedResult<Post>> {
    return await fetchWrapper.get(`posts?isPaginated=false`);
}