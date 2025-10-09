"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Check, Download, Loader2, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppItem, useDownloads } from "./downloads-context"

const APPS: AppItem[] = [
  { id: "instagram", name: "Instagram", iconSrc: "/images/icons/linkedin.svg" },
  { id: "linkedin", name: "LinkedIn", iconSrc: "/images/icons/linkedin.svg" },
  { id: "chrome", name: "Google Chrome", iconSrc: "/images/icons/chrome.svg" },
  { id: "twitterx", name: "TwitterX", iconSrc: "/images/icons/twitter.svg" },
  { id: "powerpoint", name: "Power Point", iconSrc: "/images/icons/powerpoint.svg" },
  { id: "gdrive", name: "Google Drive", iconSrc: "/images/icons/google-drive.svg" },
  { id: "instagram-2", name: "Instagram", iconSrc: "/images/icons/linkedin.svg" },
  { id: "chatgpt", name: "ChatGpt", iconSrc: "/images/icons/openai.svg" },
]

export function AppStoreDialog() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const { startDownload, isDownloaded, isDownloading } = useDownloads()

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? APPS.filter((a) => a.name.toLowerCase().includes(s)) : APPS
  }, [q])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mt-8 rounded-full bg-white px-6 py-3 text-[20px] font-medium text-foreground shadow-lg hover:bg-white/95">
        Browse Apps...
      </DialogTrigger>
      <DialogContent
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.20)",
        }}
        className="sm:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">App Store</DialogTitle>
        </DialogHeader>

        {/* Search Bar */}
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/60" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search App"
            className="pl-9 pr-9 rounded-full bg-white/70 text-foreground placeholder:text-foreground/60"
          />
          <button
            aria-label="Clear search"
            onClick={() => setQ("")}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-foreground/70 hover:bg-white/50",
              q ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <hr className="my-3 border-white/30" />

        {/* Apps Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((app) => (
            <AppRow
              key={app.id}
              app={app}
              downloading={isDownloading(app.id)}
              downloaded={isDownloaded(app.id)}
              onDownload={async () => {
                await startDownload(app)
              }}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AppRow({
  app,
  onDownload,
  downloading,
  downloaded,
}: {
  app: AppItem
  onDownload: () => void
  downloading: boolean
  downloaded: boolean
}) {
  return (
    <div
      className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/40 px-3 py-3 shadow-sm"
      style={{ backdropFilter: "blur(6px)" }}
    >
      <div className="flex items-center gap-3">
        <Image
          src={app.iconSrc || "/placeholder.svg"}
          alt={`${app.name} icon`}
          width={40}
          height={40}
          className="rounded-lg"
        />
        <span className="text-sm font-medium text-foreground">{app.name}</span>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9 rounded-full bg-white/70 text-foreground hover:bg-white/90"
        aria-label={downloaded ? "Downloaded" : "Download"}
        onClick={onDownload}
        disabled={downloading || downloaded}
      >
        {downloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : downloaded ? (
          <Check className="h-4 w-4" />
        ) : (
          <Download className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
