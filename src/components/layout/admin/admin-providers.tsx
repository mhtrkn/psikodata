import { ThemeProvider } from 'next-themes'
import React from 'react'
import { Toaster } from 'sonner'

function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className="relative w-full min-h-screen bg-card text-card-foreground">
          {children}
        </main>
        <Toaster richColors position="bottom-right" />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default AdminProviders
