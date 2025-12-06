import { ThemeProvider } from 'next-themes'
import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { Toaster } from 'sonner'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <main className="container bg-card text-card-foreground mx-auto grid grid-cols-12 auto-rows-min gap-6 pb-6 xl:py-6 px-4 xl:px-0 overflow-hidden">
          {children}
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Providers
