'use server'

import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { PagedResult, User } from "@/types";

export async function getUserId(): Promise<number | null> {
    const token = await auth();
    return token?.user?.userId ?? null;
}

export async function uploadImage(userId: number, formData: FormData): Promise<any> {
    return await fetchWrapper.post(`users/${userId}/profile/images`, formData)
}

export async function getProfile(userId: number): Promise<User> {
    return await fetchWrapper.get(`users/${userId}/profile`)
}

export async function getAllUsers(query: string): Promise<PagedResult<User>> {
    return await fetchWrapper.get(`users${query}`)
}