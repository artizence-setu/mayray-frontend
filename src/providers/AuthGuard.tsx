"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((s) => s.accessToken);
  const hydrated = useAuthStore((s) => s.hydrated);

  const publicRoutes = ["/login", "/register", "/"];

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    if (!publicRoutes.includes(pathname)) {
      if (!token) {
        router.replace("/login");
      } else {
        setChecked(true);
      }
    } else {
      setChecked(true);
    }
  }, [pathname, token, hydrated, router]);

  if (!checked) return null;

  return <>{children}</>;
}
