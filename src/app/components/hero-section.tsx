
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useDownloads } from "./downloads-context"
import { AppStoreDialog } from "./app-store-dialog"

// New imports

const BACKGROUND_IMAGES = [
  "/images/hero1.png",
  "/images/hero2.png",
  "/images/hero3.png",
  "/images/hero4.png",
  "/images/hero5.png",
]

export function HeroSection() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  // Access downloaded apps
  const { downloaded } = useDownloads()

  const handleProfileClick = () => {
    setCurrentBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length)
  }

  return (
    <div className="container">
      <div className="relative mb-20 mt-4 flex flex-1 flex-col">
        <div className="relative w-full aspect-[1360/872] rounded-2xl overflow-hidden mx-auto mt-4 md:mx-6">
          <Image
            src={BACKGROUND_IMAGES[currentBgIndex] || "/placeholder.svg"}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-serif text-5xl font-light italic text-white drop-shadow-lg md:text-6xl lg:text-7xl">
              Welcome to Mayray
            </h1>
            <p className="mt-2 text-sm text-white/90 drop-shadow md:text-base">Your Digital AI Employee</p>

            <AppStoreDialog />
          </div>
        </div>

        <button
          onClick={handleProfileClick}
          className="absolute left-1/2 pl-10 pt-5 cursor-pointer top-5 z-50 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-105 active:scale-95"
          aria-label="Change background"
        >
          <Image
            src="/images/avatar.png"
            alt="Profile"
            width={70}
            height={70}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </button>

        <div
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
            backdropFilter: "blur(3px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "30px",
            padding: "16px",
          }}
          className="absolute bottom-0 left-1/2 z-10 flex w-full -translate-x-1/2 items-center justify-between md:mx-6 rounded-3xl"
        >
          {/* Left Plus Button + Downloaded icons */}
          <div className="ml-40 flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-12 w-12 shadow-white rounded-full bg-white/70 text-foreground"
            >
              <Plus className="h-6 w-6" />
            </Button>
                     <div
            className=" absolute -bottom-2 right-7 transform translate-x-1/2 z-10  flex w-full "
          >
            <Image src="/images/home.svg" height={50} width={50} alt="image" />
          </div>
            

            <div className="flex items-center gap-2">
              {downloaded.map((app) => (
                <Image
                  key={app.id}
                  src={app.iconSrc || "/placeholder.svg"}
                  alt={app.name}
                  width={36}
                  height={36}
                  className="rounded-full border border-white/60 bg-white/80 shadow-sm"
                />
              ))}
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="h-12 w-12 mr-40 rounded-full shadow-md bg-white/70 text-foreground"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
