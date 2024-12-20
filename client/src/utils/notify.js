import { toast } from "react-toastify";

function notifySuccess(message) {
  toast.success(message);
}

function notifyError(error) {
  if (error.status === 401) return;

  const message = error?.response?.data?.message ?? "Internal server error";
  toast.error(message);
}

function notifyWarning(message) {
  toast.warning(message);
}

export { notifySuccess, notifyError, notifyWarning };
