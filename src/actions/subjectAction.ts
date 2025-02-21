'use server'

import { Subject, PagedResult } from "../types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Subject>> {
    return await fetchWrapper.get(`subjects${query}`)
}