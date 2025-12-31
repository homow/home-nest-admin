import {cookies} from "next/headers";

export async function getAccessCookie(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value;
}