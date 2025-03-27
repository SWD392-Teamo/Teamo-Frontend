'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { Major, PagedResult } from "@/types";

export async function getData(query: string): Promise<PagedResult<Major>> {
    return await fetchWrapper.get(`majors${query}`)
}

export async function getAllMajors(query: string): Promise<PagedResult<Major>> {
    return await fetchWrapper.get(`majors${query}`)
}

export async function getMajorById(majorId: number): Promise<Major> {
    return await fetchWrapper.get(`majors/${majorId}`)
}

export async function createMajor(formData: FormData): Promise<any> {
    return await fetchWrapper.post(`majors`, formData)
}

export async function updateMajor(majorId: number, formData: FormData): Promise<any> {
    return await fetchWrapper.patch(`majors/${majorId}`, formData)
}

export async function deleteMajor(majorId: number): Promise<any> {
    return await fetchWrapper.del(`majors/${majorId}`)
}