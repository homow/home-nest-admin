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

export type {LoginFormDataTypes};