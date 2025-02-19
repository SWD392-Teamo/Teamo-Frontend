'use server'

import { Subject, PagedResult } from "../types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<Subject> {
    return await fetchWrapper.get(`subjects${query}`)
}