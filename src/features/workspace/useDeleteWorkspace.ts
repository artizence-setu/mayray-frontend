"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useDeleteWorkspace() {
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/workspace/${id}/delete`);
      return data;
    },
  });
}
