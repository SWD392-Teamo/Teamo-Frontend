'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { Application, PagedResult } from "@/types";

export async function getUserApplications(query: string): Promise<PagedResult<Application>> {
    return await fetchWrapper.get(`applications${query}`)
}

export async function getGroupApplications(groupId: number, query: string): Promise<PagedResult<Application>> {
    return await fetchWrapper.get(`groups/${groupId}/applications${query}`)
}

export async function reviewApplication(groupId: number, applicationId: number, status: {status: string}): Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}/applications/${applicationId}`, status)
}