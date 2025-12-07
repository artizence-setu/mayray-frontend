"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useUpdateAvatar() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);

      const { data } = await api.put("/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data;
    },
  });
}
