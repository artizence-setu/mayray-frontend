    "use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plus, LayoutGrid } from "lucide-react"

const BACKGROUND_IMAGES = [
  "/images/hero1.png",
    "/images/hero2.png",
      "/images/hero3.png",
        "/images/hero4.png",
          "/images/hero5.png"





]

export function HeroSection() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  const handleProfileClick = () => {
    setCurrentBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length)
  }

  return (
        <div className="container">
      <div className="relative mx-4 mt-4 flex flex-1 flex-col  ">
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
    <Button
      size="lg"
      className="mt-8 rounded-full bg-white px-8 py-6 text-base font-medium text-foreground shadow-lg hover:bg-white/95"
    >
      Browse Apps
    </Button>
  </div>


</div>


        <button
          onClick={handleProfileClick}
          className="absolute left-1/2  pl-10 pt-5 cursor-pointer  top-5   z-50 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-105 active:scale-95"
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

        
<div className="absolute bottom-0  left-1/2 z-10 flex w-full -translate-x-1/2 items-center justify-between  md:mx-6 rounded-3xl border-2 border-white/30 bg-white/20 p-4 backdrop-blur-md ">
  {/* Left Plus Button */}
  <Button
    size="icon"
    variant="ghost"
    className="h-12 w-12 rounded-full bg-white/60 text-foreground hover:bg-white/80"
  >
    <Plus className="h-6 w-6" />
  </Button>

 
  <Button
    size="icon"
    variant="ghost"
    className="h-12 w-12 rounded-full bg-white/60 text-foreground hover:bg-white/80"
  >
    <Plus className="h-6 w-6" />
  </Button>
</div>

      </div>
      </div>
    
  )
}
