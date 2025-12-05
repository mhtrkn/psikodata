type ToastType = "success" | "error" | "info";

export interface ToastState {
  open: boolean;
  message: string;
  type: ToastType;
  show: (msg: string, type?: ToastType) => void;
  hide: () => void;
}
