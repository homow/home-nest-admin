import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if (!refreshToken) {
        return NextResponse.json({
            ok: false,
            message: "refresh token is expired",
        }, {
            status: 401
        });
    }


}