import {NextResponse} from "next/server";

export function POST() {
    return NextResponse.json(
        {
            ok: true,
            message: "User successfully logged in",
            user: {
                name: "John",
                age: 2,
            }
        },
        {
            status: 200
        }
    );
}