import {z} from "zod";

const signupSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().optional(),
});

export {
    signupSchema,
};