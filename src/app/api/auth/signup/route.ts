import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log(body);

    return NextResponse.json(
        {
            ok: true,
            message: "User successfully registered",
        },
        {
            status: 201
        }
    );
}