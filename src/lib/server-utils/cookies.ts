import {cookies} from "next/headers";

export async function getAccessCookie(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value;
}

export async function setAccessToken(accessToken: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set({
        name: "accessToken",
        value: accessToken,
        httpOnly: true,
        maxAge: 60 * 60,
        expires: new Date(Date.now() + 60 * 60 * 1000),
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
    });
}

export async function setRefreshToken(refreshToken: string, remember?: boolean): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set({
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true,
        maxAge: remember
            ? 7 * 24 * 60 * 60
            : 24 * 60 * 60,
        expires: remember
            ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            : new Date(Date.now() + 24 * 60 * 60 * 1000),
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production"
    });
}