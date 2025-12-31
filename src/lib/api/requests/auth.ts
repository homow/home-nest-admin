import {LoginInput} from "@/types/auth";

async function login(data: LoginInput) {
    try {
        const res: Response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return res.json();
    } catch (_) {
        throw new Error("Internal Server Error");
    }
}

export {
    login,
};