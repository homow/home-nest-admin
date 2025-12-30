import {userSchema} from "@/validations/auth";
import {getRequestBody} from "@/lib/api-utils/utils";
import {type NextRequest, NextResponse} from "next/server";

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

    try {

    } catch (_) {

    }
}