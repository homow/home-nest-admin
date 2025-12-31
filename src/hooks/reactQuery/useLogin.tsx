"use client";

import {LoginInput} from "@/types/auth";
import {login} from "@/lib/api/requests/auth";
import {useMutation} from "@tanstack/react-query";

export default function useLogin() {
    return useMutation({
        mutationFn: async (data: LoginInput) => {
            return await login(data);
        },
        mutationKey: ["login"]
    });
};