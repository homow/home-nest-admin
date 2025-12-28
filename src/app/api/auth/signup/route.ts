import {NextRequest, NextResponse} from "next/server";
import {emailRegex} from "@/lib/auth-utils";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email, password, name} = body;

    if (!email || !password) {
        return NextResponse.json(
            {ok: false, message: "email and password are required"},
            {status: 400}
        );
    }
    
    if (!emailRegex.test(email)) {
        return NextResponse.json(
            {ok: false, message: "invalid email format"},
            {status: 400}
        );
    }

    if (typeof password !== "string") {
        return NextResponse.json(
            {ok: false, message: "password must be a string"},
            {status: 400}
        );
    }

    if (password.length < 6) {
        return NextResponse.json(
            {ok: false, message: "password must be at least 6 characters"},
            {status: 400}
        );
    }

    return NextResponse.json({
        ok: true,
        message: "user successfully registered",
        data: {
            email,
            name,
        }
    });
}