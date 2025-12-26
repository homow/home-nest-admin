import {NextResponse} from "next/server";

export function POST() {
    return NextResponse.json(
        {
            ok: true,
            message: "User successfully logged in",
            user: {
                name: "Fucking Copilot",
                age: 2,
                parent: "Fucking Microsoft"
            }
        },
        {
            status: 200
        }
    );
}