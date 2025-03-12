'use server'

import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getTeamRecommendations(input: string): Promise<any> {
    return await fetchWrapper.post('agent/team-recommendations', input);
}

export async function getProjectSuggestions(input: string): Promise<any> {
    return await fetchWrapper.post('agent/project-suggestions', input);
}

export async function getSkillImprovement(input: string): Promise<any> {
    return await fetchWrapper.post('agent/skill-improvement', input);
}



