import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function reverseKebabCase(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function validatePassword(password: string) {
  if (!password) return [];
  const rules = [
    { regex: /.{8,64}/, message: "8-64 characters" },
    {
      regex: /^[a-zA-Z0-9!@#$%^&*]+$/,
      message: "Only a-z, A-Z, 0-9, !@#$%^&*",
    },
    { regex: /^(?=.*[A-Z])/, message: "At least one uppercase letter" },
    { regex: /^(?=.*[a-z])/, message: "At least one lowercase letter" },
    { regex: /^(?=.*[0-9])/, message: "At least one number" },
    { regex: /^(?=.*[!@#$%^&*])/, message: "At least one special character" },
  ];
  return rules
    .filter((rule) => !rule.regex.test(password))
    .map((r) => r.message);
}
