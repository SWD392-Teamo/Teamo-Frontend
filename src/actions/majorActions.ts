'use server'

import { FieldValues } from "react-hook-form";
import { Major, PagedResult } from "../types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Major>> {
    return await fetchWrapper.get(`major${query}`)
}
export async function createMajor(data: FieldValues): Promise<any> {
    return await fetchWrapper.post(`major`, data)
}