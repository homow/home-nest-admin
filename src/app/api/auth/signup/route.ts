import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email, password, name} = body;

    if (!email && !password) {
        return NextResponse.json(
            {
                ok: false,
                error: "email and password are required"
            }, {status: 400}
        );
    }

    if (typeof password !== "string" || password.length < 6) {
        return NextResponse.json(
            {
                ok: false,
                error: "password must be at least 6 characters"
            },
            {status: 400}
        );
    }
}