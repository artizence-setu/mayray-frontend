"use client"

import { Bell, Mic, Sparkles } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import { FaBell } from "react-icons/fa6";


export function AppHeader() {
  const [assistantOn, setAssistantOn] = useState(true)

  return (
  <header className="w-full  border-b border-border bg-background">
    <div className="container">
  <div className=" flex   items-center gap-3 px-3 py-2 md:gap-4 md:px-4 relative">
    <Link href="/" className="flex items-center gap-2 md:gap-3" aria-label="Go to homepage">
      <img src="/images/logo.svg" alt="Mayray logo" className="object-cover" />
    </Link>

    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 w-[50%] md:w-[40%]">
      <div
        className={cn(
          "flex flex-1 mr-3 items-center justify-center rounded-full border border-input bg-muted",
          "px-3 py-1.5 md:px-4 md:py-2"
        )}
        role="search"
        aria-label="Ask Anything"
      >
        <input
          type="text"
          placeholder="Ask Anything"
          aria-label="Ask Anything"
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none",
            "md:text-base"
          )}
        />
        <span className="mx-2 hidden h-6 border-l border-dashed border-border md:block" />
        <button
          type="button"
          className="hidden rounded-full p-1.5 text-foreground hover:bg-accent md:inline-flex"
          aria-label="Voice input"
        >
          <Mic className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button
          type="button"
          className={cn(
            "ml-1 inline-flex items-center gap-1 rounded-full border border-border bg-foreground px-2 py-1",
            "text-xs font-medium text-background md:px-3 md:py-1.5"
          )}
          aria-label="Assistant suggestion"
        >
          <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Switch checked={assistantOn} onCheckedChange={setAssistantOn} aria-label="Assistant" />
        <span className="hidden text-xs text-muted-foreground md:block">Assistant</span>
      </div>
    </div>

    <div className="ml-auto flex items-center gap-2">
      <button type="button" className="rounded-full p-2 text-foreground hover:bg-accent" aria-label="Notifications">
        <FaBell className="h-5 w-5 md:h-6 md:w-6" />

      </button>
      <Avatar className="h-7 w-7 md:h-10 md:w-10">
        <AvatarImage src="/images/avatar.png" alt="User avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  </div>
  </div>
</header>


  )
}
