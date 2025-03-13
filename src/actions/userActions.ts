'use server'


import {  addSkillProfile, addLinkProfile } from './../types/interface';
import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { Link, PagedResult, StudentSkill, User } from "@/types";

export async function getUserId(): Promise<number | null> {
    const token = await auth();
    return token?.user?.userId ?? null;
}

export async function uploadImage(userId: number, formData: FormData): Promise<any> {
    return await fetchWrapper.post(`users/${userId}/profile/image`, formData)
}

export async function getProfile(userId: number): Promise<User> {
    return await fetchWrapper.get(`users/${userId}/profile`)
}

export async function updateDescriptions(userId: number, description: string): Promise<User>{
    return await fetchWrapper.patch(`users/${userId}/profile/descriptions`, {description})
}

export async function addSkill(userId: number, addSkillProfile: addSkillProfile): Promise<User>{
    return await fetchWrapper.post(`users/${userId}/profile/skills`, addSkillProfile)
}

export async function updateSkill(userId:number, skillId: number, level:string): Promise<StudentSkill>{
    return await fetchWrapper.patch(`users/${userId}/profile/skills/${skillId}`, level)

}

export async function addLink(userId: number, addLinkProfile: addLinkProfile): Promise<Link>{
    return await fetchWrapper.post(`users/${userId}/profile/links`, addLinkProfile)
}

export async function updateLink(userId: number, linkId: number, addLinkProfile: addLinkProfile): Promise<Link>{
    return await fetchWrapper.patch(`users/${userId}/profile/links/${linkId}`, addLinkProfile)
}