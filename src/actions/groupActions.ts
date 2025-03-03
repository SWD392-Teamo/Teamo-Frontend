'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { GroupGeneral, PagedResult } from "@/types"

export async function getData(query: string): Promise<PagedResult<GroupGeneral>> {
    return await fetchWrapper.get(`groups${query}`)
}