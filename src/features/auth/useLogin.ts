"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

type LoginPayload = {
  email: string;
  password: string;
};

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post("/auth/login", payload);
      return data;
    },
  });
}
