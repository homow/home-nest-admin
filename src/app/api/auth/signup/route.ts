import {UserModel} from "@/models/auth";
import connectToDB from "@/lib/db/mongo";
import {signupSchema} from "@/validations/auth";
import {type NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const reslut = signupSchema.safeParse(body);

    if (!reslut.success) {
        return NextResponse.json({
            ok: false,
            message: reslut.error.issues[0].message,
        }, {
            status: 400
        });
    }

    const {email, password, name} = reslut.data;

    try {
        await connectToDB();

        const user = await UserModel.findOne({email});

        if (user) {
            return NextResponse.json({
                ok: false,
                message: `email already exists`,
            }, {
                status: 409
            });
        }

        return NextResponse.json({
            ok: true,
            message: "user successfully registered",
            data: {
                email,
                name,
                password,
            }
        }, {
            status: 201
        });
    } catch (e) {
        console.log(e);

        NextResponse.json({
            ok: false,
            message: "Internal Server Error",
        }, {
            status: 500
        });
    }
}