'use server'

import { FieldValues } from "react-hook-form";
import { Subject, PagedResult, Skill } from "../types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Skill>> {
    return await fetchWrapper.get(`skills${query}`)
}

export async function getAllSkills(): Promise<Skill[]> {
    return await fetchWrapper.get(`skills?isPaginated=false`)
}

export async function getSkillById(skillId: number): Promise<Skill> {
    return await fetchWrapper.get(`skills/${skillId}`)
}

export async function createSkill(data: FieldValues): Promise<any> {
    return await fetchWrapper.post(`skills`, data)
}

export async function updateSkill(skillId: number, data: FieldValues): Promise<any> {
    return await fetchWrapper.patch(`skills/${skillId}`, data)
}

export async function deleteSkill(skillId: number): Promise<any> {
    return await fetchWrapper.del(`skills/${skillId}`)
}