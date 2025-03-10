'use server'

import { FieldValues } from "react-hook-form";
import { Semester, PagedResult } from "../types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Semester>> {
    return await fetchWrapper.get(`semester${query}`)
}

export async function createSemester(data: FieldValues): Promise<any> {
    return await fetchWrapper.post(`semester`, data)
}