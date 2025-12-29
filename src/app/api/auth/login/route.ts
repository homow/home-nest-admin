import {type NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();



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