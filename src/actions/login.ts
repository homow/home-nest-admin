"use server";

import {LoginFormDataTypes} from "@/types/auth";

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
            emailError: "ایمیل باید وارد بشه",
            fields: {
                email: prevState.fields.email,
                password: prevState.fields.password,
                remember: prevState.fields.remember,
            }
        };
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