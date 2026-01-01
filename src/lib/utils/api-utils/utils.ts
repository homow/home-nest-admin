import {z} from "zod";
import {ValidateBodyTypes} from "@/types/api";
import {type NextRequest, NextResponse} from "next/server";

export async function getRequestBody(
    req: NextRequest,
    message: string,
) {
    let body;

    try {
        body = await req.json();
    } catch (_) {
        return NextResponse.json({
            ok: false,
            message: "JSON body is empty",
        }, {
            status: 400
        });
    }

    if (!body || Object.keys(body).length === 0) {
        return NextResponse.json(
            {
                ok: false,
                message,
            },
            {status: 400}
        );
    }
    return body;
}

export function returnInternalServerError() {
    return NextResponse.json({
        ok: false,
        message: "Internal Server Error",
    }, {
        status: 500
    });
}

export function formatZodError(error: z.ZodError) {
    return error?.issues?.map(i => ({
        fields: i.path.join("."),
        message: i.message,
    }));
}

export async function validateBody<T extends z.ZodTypeAny>(
    {
        req,
        schema,
        message,
    }: ValidateBodyTypes<T>
) {
    const body = await getRequestBody(req, message);

    if (body instanceof NextResponse) return body;

    const result = schema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({
            ok: false,
            errors: formatZodError(result.error),
        }, {
            status: 422
        });
    }

    return result.data as z.infer<T>;
}