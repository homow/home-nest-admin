import {z} from "zod";

const userSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
        .min(6,
            "Password must be at least 6 characters"
        )
        .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/,
            "Password must contain at least one letter and one number"
        ),
    name: z.string().optional(),
    remember: z.boolean().optional(),
});

export {
    userSchema,
};