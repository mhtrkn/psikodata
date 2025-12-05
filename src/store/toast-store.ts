"use client";

import { ToastState } from "@/types/toast";
import { create } from "zustand";

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: "",
  type: "info",

  show: (msg, type = "success") =>
    set({ open: true, message: msg, type }),

  hide: () =>
    set({ open: false, message: "" }),
}));
