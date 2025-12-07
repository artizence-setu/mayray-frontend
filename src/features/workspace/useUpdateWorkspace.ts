"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

type WorkspacePayload = {
  name: string;
  description: string;
};

export function useUpdateWorkspace() {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: number; payload: WorkspacePayload }) => {
      const { data } = await api.put(`/workspace/${id}`, payload);
      return data;
    },
  });
}
