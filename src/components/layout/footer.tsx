function Footer() {
  return (
    <footer className="w-full border-t bg-card text-card-foreground border-t-neutral-200 dark:border-t-neutral-700">
      <div className="container mx-auto py-6 text-center opacity-70">
        © {new Date().getFullYear()} Blog. Tüm hakları saklıdır.
      </div>
    </footer>
  )
}

export default Footer
