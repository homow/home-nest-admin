import {type NextRequest, NextResponse} from "next/server";

export async function getRequestBody(
    req: NextRequest,
    message: string,
) {
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