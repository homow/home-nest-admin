import {
    getRequestBody,
    returnInternalServerError
} from "@/lib/api-utils/utils";
import connectToDB from "@/lib/db/mongo";
import {userSchema} from "@/validations/auth";
import {type NextRequest, NextResponse} from "next/server";
import {UserModel} from "@/models/auth";

export async function POST(req: NextRequest) {
    const body = await getRequestBody(req, "email and password required");
    if (body instanceof NextResponse) return body;

    const resValidate = userSchema.safeParse(body);

    if (!resValidate.success) {
        return NextResponse.json(
            {
                ok: false,
                message: resValidate.error.issues[0].message,
            },
            {status: 422}
        );
    }
    const {email, password} = resValidate.data;

    try {
        await connectToDB();
        const user = await UserModel.findOne({email});

        if (!user) {
            return NextResponse.json({
                ok: false,
                message: "Invalid email or password",
            }, {
                status: 401
            });
        }
    } catch (_) {
        return returnInternalServerError();
    }
}