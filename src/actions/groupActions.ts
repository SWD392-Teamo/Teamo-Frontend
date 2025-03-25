'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { Group, PagedResult } from "@/types"

export async function getData(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`groups${query}`)
}

export async function getGroupById(groupId: number): Promise<Group> {
    return await fetchWrapper.get(`groups/${groupId}`);
}

export async function getUserGroups(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`profile/groups${query}`)
}