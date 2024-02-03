import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Home | Clinica VivaMais',
  description: 'ERP para clinicas de fisioterapia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-mode="ligth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
