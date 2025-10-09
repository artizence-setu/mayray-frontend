"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type AppItem = {
  id: string
  name: string
  iconSrc: string
}

type DownloadsContextType = {
  downloaded: AppItem[]
  isDownloaded: (id: string) => boolean
  startDownload: (app: AppItem) => Promise<void>
  removeDownload: (id: string) => void
  isDownloading: (id: string) => boolean
}

const DownloadsContext = createContext<DownloadsContextType | null>(null)

export function DownloadsProvider({ children }: { children: React.ReactNode }) {
  const [downloaded, setDownloaded] = useState<AppItem[]>([])
  const [pending, setPending] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem("downloads:v1")
      if (raw) setDownloaded(JSON.parse(raw))
    } catch {}
  }, [])

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("downloads:v1", JSON.stringify(downloaded))
    } catch {}
  }, [downloaded])

  const isDownloaded = (id: string) => downloaded.some((a) => a.id === id)
  const isDownloading = (id: string) => !!pending[id]

  const startDownload = async (app: AppItem) => {
    if (isDownloaded(app.id) || isDownloading(app.id)) return
    setPending((p) => ({ ...p, [app.id]: true }))
    // simulate download
    await new Promise((r) => setTimeout(r, 1200))
    setDownloaded((prev) => {
      if (prev.some((a) => a.id === app.id)) return prev
      return [...prev, app]
    })
    setPending((p) => {
      const { [app.id]: _, ...rest } = p
      return rest
    })
  }

  const removeDownload = (id: string) => {
    setDownloaded((prev) => prev.filter((a) => a.id !== id))
  }

  const value = useMemo(
    () => ({ downloaded, isDownloaded, startDownload, removeDownload, isDownloading }),
    [downloaded, pending],
  )

  return <DownloadsContext.Provider value={value}>{children}</DownloadsContext.Provider>
}

export function useDownloads() {
  const ctx = useContext(DownloadsContext)
  if (!ctx) throw new Error("useDownloads must be used within DownloadsProvider")
  return ctx
}
