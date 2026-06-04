import { z } from "zod";
import { Role } from "../types/auth.types";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email(),
    password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    role: z.enum(Object.values(Role) as [string, ...string[]]),
    phone_number: z.string()
    .min(1, "Phone number is required")
    .refine((val) => /^\+[1-9]\d{6,14}$/.test(val), {
        message: "Enter a valid phone number",
    })
    .refine((val) => {
        // Extract everything after the country code (+233 = 4 chars, +44 = 3 chars etc.)
        // E.164: after +, first 1-3 digits are country code, rest is subscriber number
        // For any country, the digit immediately after the country code must not be 0
        const subscriberNumber = val.replace(/^\+\d{1,3}/, '');
        return !subscriberNumber.startsWith('0');
    }, {
        message: "Phone number cannot start with 0 after the country code",
    }),
    address: z.string().optional(),
    profile_picture: z.string().optional(),
})