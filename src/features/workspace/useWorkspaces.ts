"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useWorkspaces() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const { data } = await api.get("/workspace");
      return data;
    },
  });
}
