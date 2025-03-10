'use server'

import { FieldValues } from "react-hook-form";
import { Field, PagedResult } from "../types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Field>> {
    return await fetchWrapper.get(`field${query}`)
}
export async function createField(data: FieldValues): Promise<any> {
    return await fetchWrapper.post(`field`, data)
}