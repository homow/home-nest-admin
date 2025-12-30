import {z} from "zod";

const userSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
        .min(6,
            "Password must be at least 6 characters"
        )
        .refine(val => /[0-9]/.test(val),
            "Password must contain a number"
        ),
    name: z.string().optional(),
    remember: z.boolean().optional(),
});

export {
    userSchema,
};