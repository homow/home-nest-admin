import {signupSchema} from "@/validations/auth";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email, password, name} = body;

    const reslut = signupSchema.safeParse(body);

    if (!reslut.success) {
        return NextResponse.json({
            ok: false,
            message: reslut.error.issues[0].message,
        }, {
            status: 400
        });
    }

    return NextResponse.json({
        ok: true,
        message: "user successfully registered",
        data: {
            email,
            name,
        }
    }, {
        status: 201
    });
}