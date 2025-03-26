'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { Major, PagedResult, Semester } from "@/types";
import { FieldValues } from "react-hook-form";

export async function getData(query: string): Promise<PagedResult<Semester>> {
    return await fetchWrapper.get(`semesters${query}`)
}

export async function getAllSemesters(query: string): Promise<Semester[]> {
    return await fetchWrapper.get(`semesters${query}`)
}

export async function getSemesterById(semesterId: number): Promise<Semester> {
    return await fetchWrapper.get(`semesters/${semesterId}`)
}

export async function createSemester(data: FieldValues): Promise<any> {
    return await fetchWrapper.post(`semesters`, data)
}

export async function updateSemester(semesterId: number, data: FieldValues): Promise<any> {
    return await fetchWrapper.patch(`semesters/${semesterId}`, data)
}