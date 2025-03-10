"use server";

import { useSkillStore } from "@/hooks/useSkillStore";
import { useUserStore } from "@/hooks/useUserStore";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { StudentSkill } from "@/types";

export async function fetchUserProfile(userId: number) {
  try {
    const userData = await fetchWrapper.get(`users/${userId}`); 
    useUserStore.getState().setData(userData); 
    return userData;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}

export async function updateProfileDescription(userId: number,body: {description: string}): Promise<any> {
  return await fetchWrapper.patch(`users/${userId}/profile/descriptions`, body);
}

export async function getAllSkill(){
  try {
    const skill = await fetchWrapper.get(`skills`);
    useSkillStore.getState().setData(skill);
    return skill;
  } catch (error) {
    console.error("Failed to fetch student skill:", error);
    return null;
  }
}

export async function addSkill(userId: number, body: {skillId: number, level: string}): Promise<any> {
  return await fetchWrapper.post(`users/${userId}/profile/skills`, body);
}

export async function deleteSkill(userId: number, skillId: number): Promise<any> {
  return await fetchWrapper.del(`users/${userId}/profile/skills/${skillId}`);
}

export async function updateSkillLevel(userId: number, skillId: number, body: {level: string}): Promise<any> {
  return await fetchWrapper.patch(`users/${userId}/profile/skills/${skillId}`, body);
}

export async function deleteContact(userId: number, contactId: number): Promise<any> {
  return await fetchWrapper.del(`users/${userId}/profile/links/${contactId}`);
}

export async function addContact(userId: number, body: {name: string, url: string}): Promise<any> {
  return await fetchWrapper.post(`users/${userId}/profile/links`, body);
}

export async function updateContact(userId: number, id: number, body: {name: string, url: string}): Promise<any> {
  return await fetchWrapper.patch(`users/${userId}/profile/links/${id}`, body);
}