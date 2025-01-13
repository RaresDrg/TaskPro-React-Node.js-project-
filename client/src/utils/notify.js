import { toast } from "react-toastify";

export const notify = {
  success(message) {
    toast.success(message);
  },
  error(error) {
    if (error.status === 401) return;

    const message = error?.response?.data?.message ?? "Internal server error";
    toast.error(message);
  },
  warning(message) {
    toast.warning(message);
  },
};
