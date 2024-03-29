import * as z from "zod";

export const RegisterSchema = z.object({
  sFullName: z.string().min(3, {
    message: "First Name is required",
  }),
  sEmail: z.string().email({
    message: "Email must be a valid email",
  }),
  sPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
export const LoginSchema = z.object({
  sEmail: z.string().email({
    message: "Email must be a valid email",
  }),
  sPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const ResetSchema = z.object({
  sEmail: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  sPassword: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});
