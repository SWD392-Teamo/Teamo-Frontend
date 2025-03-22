'use server'

import { FieldValues } from "react-hook-form";
import { Subject, PagedResult, Field } from "../types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<Field[]> {
    return await fetchWrapper.get(`fields${query}`)
}

export async function createField(data: FieldValues): Promise<any> {
    return await fetchWrapper.post(`fields`, data)
}

export async function updateField(majorId: number, data: FieldValues): Promise<any> {
    return await fetchWrapper.patch(`fields/${majorId}`, data)
}

export async function deleteField(majorId: number): Promise<any> {
    return await fetchWrapper.del(`fields/${majorId}`)
}