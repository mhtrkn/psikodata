"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";


export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={'ghost'}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
}
