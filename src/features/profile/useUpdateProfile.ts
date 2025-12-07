"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

type ProfilePayload = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
};

export function useUpdateProfile() {
  return useMutation({
    mutationFn: async (payload: ProfilePayload) => {
      const { data } = await api.put("/profile/update", payload);
      return data;
    },
  });
}
