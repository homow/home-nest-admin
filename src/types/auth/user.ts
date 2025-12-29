import {z} from "zod";
import {userSchema} from "@/validations/auth/user";

interface LoginFormStateType {
    success: boolean;
    emailError?: string;
    passwordError?: string;
}

type SignupInput = z.infer<typeof userSchema>;

export type {LoginFormStateType, SignupInput};