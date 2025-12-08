import { ThemeProvider } from 'next-themes'
import React from 'react'
import { Toaster } from 'sonner'

function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className="w-full bg-card text-card-foreground mx-auto grid grid-cols-12 max-h-screen auto-rows-min gap-6 overflow-hidden">
          {children}
        </main>
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default AdminProviders
