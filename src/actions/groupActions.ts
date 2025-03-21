'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { Group, PagedResult } from "@/types"

export async function getData(query: string, isOwnGroup = false): Promise<PagedResult<Group>> {
    const endpoint = isOwnGroup ? `profile/groups${query}` : `groups${query}`;
    return await fetchWrapper.get(endpoint)
}

export async function getGroupById(groupId: number): Promise<Group> {
    return await fetchWrapper.get(`groups/${groupId}`);
}