"use server";

import { fetchWrapper } from "@/lib/fetchWrapper";
import { useUserStore } from "@/hooks/useUserStore";

export async function fetchUserProfile(id: number) {
  try {
    const userData = await fetchWrapper.get(`users/${id}`); // Giả định API endpoint lấy user profile
    useUserStore.getState().setData(userData); // Lưu dữ liệu vào Zustand store
    return userData;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}
