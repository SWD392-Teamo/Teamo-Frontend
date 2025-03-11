'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { Major, PagedResult, Semester } from "@/types";

export async function getData(query: string): Promise<PagedResult<Semester>> {
    return await fetchWrapper.get(`semesters${query}`)
}