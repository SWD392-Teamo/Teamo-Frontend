'use server'

import { Subject, PagedResult } from "../types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Subject>> {
    return await fetchWrapper.get(`subjects${query}`)
}

export async function getAllSubjects(query: string): Promise<Subject[]> {
    return await fetchWrapper.get(`subjects${query}`)
}


export async function getSubjectById(subjectId: number): Promise<Subject> {
    return await fetchWrapper.get(`subjects/${subjectId}`)
}

export async function createSubject(formData: FormData): Promise<any> {
    return await fetchWrapper.post(`subjects`, formData)
}

export async function updateSubject(subjectId: number, formData: FormData): Promise<any> {
    return await fetchWrapper.patch(`subjects/${subjectId}`, formData)
}

export async function deleteSubject(subjectId: number): Promise<any> {
    return await fetchWrapper.del(`subjects/${subjectId}`)
}