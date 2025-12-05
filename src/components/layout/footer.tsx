import React from 'react'

function Footer() {
  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="container mx-auto py-6 text-center opacity-70">
        © {new Date().getFullYear()} Blog. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
