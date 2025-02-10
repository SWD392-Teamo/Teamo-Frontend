'use server'

import { fetchWrapper } from "@/lib/fetchWrapper"
import { Major } from "../models/Major";

export async function getAllMajors( search? : string): Promise<Major[]> {
   try {
      const url = search ? `/majors?search=${encodeURIComponent(search)}` : "/majors";
      const response = await fetchWrapper.get(url);

      if (response.data) {
          return response.data as Major[];
      } else {
          throw new Error;
      }
  } catch (error) {
      throw error;
  }
}