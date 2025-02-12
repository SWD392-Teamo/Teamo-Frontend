'use server'

import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";

export async function login(data: FieldValues) {
    return await fetchWrapper.post(`account/login`, data);
}

export async function getCurrentUser() {
    return await fetchWrapper.get(`account/user-info`);
}

export async function logout() {
    return await fetchWrapper.post(`account/logout`, {});
}