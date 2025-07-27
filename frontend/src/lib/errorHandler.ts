import { toast } from "sonner";
import { ApiError } from "@/services/api";

export const handleGlobalError = (error: unknown) => {
  if (error instanceof ApiError) {
    toast.error(error.message)
  } else {
    toast.error("An unexpected error occurred.");
  }
};