"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useArchiveWorkspace() {
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.put(`/workspace/archive/${id}`);
      return data;
    },
  });
}
