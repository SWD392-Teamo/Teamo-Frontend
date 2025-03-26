'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { Group, PagedResult } from "@/types"
import { addGroup, addGroupMembers, addGroupPositions, editGroupPositions, editMember,  } from './../types/interface';


export async function getData(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`groups${query}`)
}

export async function getGroupById(groupId: number): Promise<Group> {
    return await fetchWrapper.get(`groups/${groupId}`);
}

export async function getUserGroups(query: string): Promise<PagedResult<Group>> {
    return await fetchWrapper.get(`profile/groups${query}`)
}
export async function banGroup(groupId: number): Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}/ban`,{})
}
export async function unBanGroup(groupId: number): Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}/unban`,{})
}

export async function createGroup(addGroup: addGroup): Promise<Group> {
    return await fetchWrapper.post('groups', addGroup);
}

export async function uploadImage( groupId: number, formData: FormData): Promise<any> {
    return await fetchWrapper.post(`groups/${groupId}/images`, formData)
}

export async function addMember( groupId: number, addGroupMember: addGroupMembers): Promise<any>{
    return await fetchWrapper.post(`groups/${groupId}/members`, addGroupMember)
}

export async function updateGroup(groupId:number, updateGroup: addGroup): Promise<Group> {
    return await fetchWrapper.patch(`groups/${groupId}`, updateGroup)
}

export async function deleteGroup(groupId: number): Promise<any> {
    return await fetchWrapper.del(`groups/${groupId}`)
}

export async function updateGroupPosition(groupId: number, positionId: number, position: editGroupPositions): Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}/positions/${positionId}`, position)
}

export async function createGroupPosition(groupId: number, addPosition: addGroupPositions): Promise<any> {
    return await fetchWrapper.post(`groups/${groupId}/positions`, addPosition)
}

export async function removeMember(groupId: number, userId: number): Promise<any> {
    return await fetchWrapper.del(`groups/${groupId}/members/${userId}`)
}
export async function removeGroupPosition(groupId: number, positionId: number): Promise<any> {
    return await fetchWrapper.del(`groups/${groupId}/positions/${positionId}`)
}

export async function updateMember(groupId: number, studentId: number, updateMember: editMember): Promise<any> {
    return await fetchWrapper.patch(`groups/${groupId}/members/${studentId}`, updateMember)
}