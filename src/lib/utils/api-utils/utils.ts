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