'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { Group, PagedResult } from "@/types"

export async function getData(query: string, isOwnGroup = false): Promise<PagedResult<Group>> {
    const endpoint = isOwnGroup ? `groups/me${query}` : `groups${query}`;
    return await fetchWrapper.get(endpoint)
}