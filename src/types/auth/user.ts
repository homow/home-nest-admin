import {signupSchema} from "@/validations/auth/user";
import {z} from "zod";

interface LoginFormDataTypes {
    success: boolean;
    emailError?: string;
    passwordError?: string;
    fields: {
        email: string;
        password: string;
        remember: boolean;
    }
}

type SignupInput = z.infer<typeof signupSchema>;

export type {LoginFormDataTypes, SignupInput};