'use server'

import { FieldValues } from "react-hook-form";
import { Subject, PagedResult } from "../types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Subject>> {
    return await fetchWrapper.get(`subjects${query}`)
}

export async function createSubject(data: FieldValues): Promise<any> {
    return await fetchWrapper.post(`subjects`, data)
}