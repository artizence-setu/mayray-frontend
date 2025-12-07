"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

type SignupPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export function useSignup() {
  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const { data } = await api.post("/auth/signup", payload);
      return data;
    },
  });
}
