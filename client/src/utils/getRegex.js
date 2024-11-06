export function getRegex(variant) {
  if (variant === "email") {
    return /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  }

  if (variant === "password") {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  }
}
