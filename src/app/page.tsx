'use client'

import { Sidebar } from "@/components/home/sidebar/sidebar";
import { useState } from "react"

export default function Home() {
  const [showAside, setShowAside] = useState(false)

  const handleToggleMenu = () => {
    setShowAside(prev => !prev)
  }

  return (
    <div className="">
      <Sidebar closeToggle={handleToggleMenu} open={showAside} />
      
    </div>
  )
}
