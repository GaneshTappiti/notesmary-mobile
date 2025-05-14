
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"
import {
  useToast as useToastOriginal,
} from "@/components/ui/toast"

export const useToast = useToastOriginal

export type ToastActionProps = React.ComponentProps<typeof Toast.Action>

export { type ToastProps }

// Re-export the same toast function to ensure consistency
export const toast = useToastOriginal().toast
