import {z} from "zod";
import {userSchema} from "@/validations/auth/user";

interface LoginFormStateType {
    success: boolean;
    emailError?: string;
    passwordError?: string;
}

type SignupInput = z.infer<typeof userSchema>;

interface LoginInput {
    email: string;
    password: string;
    remember?: boolean;
}

export type {
    LoginFormStateType,
    SignupInput,
    LoginInput,
};