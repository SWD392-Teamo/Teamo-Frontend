'use server'


import {  addSkillProfile, addLinkProfile } from './../types/interface';
import { auth } from "@/auth";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { Link, PagedResult, StudentSkill, User } from "@/types";

export async function getUserId(): Promise<number | null> {
    const token = await auth();
    return token?.user?.userId ?? null;
}

export async function uploadImage( formData: FormData): Promise<any> {
    return await fetchWrapper.post(`profile/images`, formData)
}

export async function getProfile(): Promise<User> {
    return await fetchWrapper.get('profile');
}

export async function updateDescriptions( description: string): Promise<User>{
    return await fetchWrapper.patch(`profile/description`, {description})
}

export async function addSkill(addSkillProfile: addSkillProfile[]): Promise<User>{
    return await fetchWrapper.post(`profile/skills`, addSkillProfile)
}

export async function updateSkill(skillId: number, level:string): Promise<StudentSkill>{
    return await fetchWrapper.patch(`profile/skills/${skillId}`, {level})
}

export async function removeSkill(skillId: number): Promise<StudentSkill>{
    return await fetchWrapper.del(`profile/skills/${skillId}`)
}

export async function addLink(addLinkProfile: addLinkProfile[]): Promise<User>{
    return await fetchWrapper.post(`profile/links`, addLinkProfile)
}

export async function updateLink(linkId: number, addLinkProfile: addLinkProfile): Promise<Link>{
    return await fetchWrapper.patch(`profile/links/${linkId}`, addLinkProfile)
}

export async function removeLink(linkId: number): Promise<Link>{
    return await fetchWrapper.del(`profile/links/${linkId}`)
}
export async function getAllUsers(query: string): Promise<PagedResult<User>> {
    return await fetchWrapper.get(`users${query}`)
}
export async function banUser(userId: number): Promise<any> {
    return await fetchWrapper.del(`users/${userId}`)
}
export async function getUserById(userId: number): Promise<User> {
    return await fetchWrapper.get(`users/${userId}`)
}
export async function unbanUser(userId: number): Promise<any> {
    return await fetchWrapper.patch(`users/${userId}`, {})
}