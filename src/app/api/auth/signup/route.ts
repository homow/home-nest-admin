import {UserModel} from "@/models/auth";
import {UserRoles} from "@/types/models";
import connectToDB from "@/lib/db/mongo";
import {userSchema} from "@/validations/auth";
import {hashSecret} from "@/lib/auth-utils/auth";
import {type NextRequest, NextResponse} from "next/server";
import {getRequestBody, returnInternalServerError} from "@/lib/api-utils/utils";

export async function POST(req: NextRequest) {
    const body = await getRequestBody(req, "email and password required");
    if (body instanceof NextResponse) return body;

    const resultValidate = userSchema.safeParse(body);

    if (!resultValidate.success) {
        return NextResponse.json({
            ok: false,
            message: resultValidate.error.issues[0].message,
        }, {
            status: 422
        });
    }

    const {email, password, name} = resultValidate.data;

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
    } catch (_) {
        return returnInternalServerError();
    }
}