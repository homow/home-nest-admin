import {UserModel} from "@/models/auth";
import {UserRoles} from "@/types/models";
import connectToDB from "@/lib/db/mongo";
import {signupSchema} from "@/validations/auth";
import {hashSecret} from "@/lib/auth-utils/auth";
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

        const hashedPassword: string = await hashSecret(password);

        const res = await UserModel.create({
            name,
            email,
            role: UserRoles.USER,
            password: hashedPassword,
        });

        const newUser = res.toObject();

        return NextResponse.json({
            ok: true,
            message: "user successfully registered",
            user: {
                email: newUser.email,
                role: newUser.role,
                name: newUser.name,
                isActive: newUser.isActive,
                createdAt: newUser.createdAt.toISOString(),
            }
        }, {
            status: 201
        });

        // eslint-disable-next-line
    } catch (e) {
        NextResponse.json({
            ok: false,
            message: "Internal Server Error",
        }, {
            status: 500
        });
    }
}