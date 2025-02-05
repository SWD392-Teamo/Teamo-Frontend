'use server'

import { fetchWrapper } from "@/lib/fetchWrapper";
import { cookies } from 'next/headers';
import { FieldValues } from "react-hook-form";

export async function login(data: FieldValues) {
    const response = await fetchWrapper.post(`account/login`, data);

    if (response.cookies) {
        const cookieStore = await cookies();

        const cookieString = response.cookies;

        const cookieParts = cookieString.split(';')[0]; // Only get the first part before ";"
        const [cookieName, cookieValue] = cookieParts.split('=');
        
        cookieStore.set(cookieName.trim(), cookieValue.trim(), {
            path: '/',       // Ensure it's accessible across the app
            httpOnly: cookieString.toLowerCase().includes('httponly'),  // Check if HttpOnly is set
            secure: cookieString.toLowerCase().includes('secure'),      // Check if Secure is set
            sameSite: cookieString.toLowerCase().includes('samesite=none') ? 'none' : 'lax', // Check for SameSite policy or default to lax
        });
    }

    return response.data;
}

export async function getCurrentUser() {
    return await fetchWrapper.get(`account/user-info`);
}