import {userSchema} from "@/validations/auth";
import {type NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    let body;

    try {
        body = await req.json();
        // eslint-disable-next-line
    } catch (e) {
        return NextResponse.json({
            ok: false,
            message: "Invalid or empty JSON body",
        }, {
            status: 400
        });
    }

    const resValidate = userSchema.safeParse(body);

    if (!resValidate.success) {
        return NextResponse.json(
            {
                ok: false,
                message: resValidate.error.issues[0].message,
            }
        );
    }

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