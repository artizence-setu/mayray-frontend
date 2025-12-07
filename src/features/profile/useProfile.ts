"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get("/profile");
      return data;
    },
    staleTime: 1000 * 60 * 5, // optional (cache 5 min)
  });
}
