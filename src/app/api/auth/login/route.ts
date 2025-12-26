import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();

    cookieStore.set("GPT", "GPT", {
        maxAge: 60
    });

    const body = await req.json();

    console.log(body);

    return NextResponse.json(
        {
            ok: true,
            message: "User successfully logged in",
            user: {
                name: "John",
                age: 2,
            }
        }
    );
}