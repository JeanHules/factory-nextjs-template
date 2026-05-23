import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'App',
  description: 'Built by Software Factory',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
