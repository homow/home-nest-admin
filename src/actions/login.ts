"use server";

import {LoginFormDataTypes} from "@/types/auth";
import {emailRegex} from "@/lib/auth-utils";

export async function login(
    prevState: LoginFormDataTypes,
    formData: FormData,
): Promise<LoginFormDataTypes> {
    const email = formData.get("email");
    const password = formData.get("password");

    const trimmedEmail: string = String(email)?.trim()?.toLowerCase();
    const trimPassword: string = String(password)?.trim();

    const newErrors = {
        email: trimmedEmail ? "" : "ایمیل رو وارد کن",
        password: trimPassword ? "" : "پسورد رو وارد کن",
    }

    if (newErrors.email || newErrors.password) {
        return {
            success: false,
            emailError: newErrors.email,
            passwordError: newErrors.password,
            fields: {
                email: prevState.fields.email,
                password: prevState.fields.password,
                remember: prevState.fields.remember,
            }
        };
    }

    if (!emailRegex.test(trimmedEmail)) {
        return {
            success: false,
            emailError: "فرمت ایمیل اشتباهه",
            fields: {
                email: prevState.fields.email,
                password: prevState.fields.password,
                remember: prevState.fields.remember,
            }
        }
    }

    return {
        success: true,
        emailError: "",
        passwordError: "",
        fields: {
            password: "",
            email: "",
            remember: false,
        }
    }
}