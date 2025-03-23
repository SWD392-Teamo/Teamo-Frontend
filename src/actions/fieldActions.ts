'use server'

import { FieldValues } from "react-hook-form";
import { Subject, PagedResult, Field } from "../types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Field>> {
    return await fetchWrapper.get(`fields${query}`)
}

export async function getFieldById(fieldId: number): Promise<Field> {
    return await fetchWrapper.get(`fields/${fieldId}`)
}

export async function createField(data: FieldValues): Promise<any> {
    return await fetchWrapper.post(`fields`, data)
}

export async function updateField(fieldId: number, data: FieldValues): Promise<any> {
    return await fetchWrapper.patch(`fields/${fieldId}`, data)
}

export async function deleteField(fieldId: number): Promise<any> {
    return await fetchWrapper.del(`fields/${fieldId}`)
}