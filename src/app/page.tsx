'use client'

import { Sidebar } from "@/components/ui/sidebar/sidebar";
import { useState } from "react"

export default function Home() {
  const [showAside, setShowAside] = useState(false)

  const handleToggleMenu = () => {
    setShowAside(prev => !prev)
  }

  return (
    <div className="">
      <Sidebar closeToggle={handleToggleMenu} open={showAside} />
      <div className="p-4 sm:ml-64">
        <h1>Bem vindo!</h1>
      </div>
    </div>
  )
}
