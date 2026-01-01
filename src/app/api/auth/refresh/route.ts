import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import RefreshTokenModel from "@/models/auth/RefreshToken";
import {JwtPayload} from "jsonwebtoken";
import {returnInternalServerError} from "@/lib/utils/api-utils/utils";
import {compareSecret, verifyToken} from "@/lib/utils/auth-utils/auth";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
        return NextResponse.json({
            ok: false,
            message: "refresh token not found",
        }, {
            status: 401
        });
    }

    let payload;
    try {
        payload = verifyToken(refreshToken);
    } catch (_) {
        return NextResponse.json({
            ok: false,
            message: "Invalid refresh token",
        }, {
            status: 401
        });
    }

    const jwtPayload = payload as JwtPayload;

    try {
        const findToken = await RefreshTokenModel.find({
            userId: jwtPayload.id,
        });

        let matchToken;

        for (const t of findToken) {
            const isValid: boolean = await compareSecret(refreshToken, t.token);

            if (isValid) {
                matchToken = t;
                break;
            }
        }

        if (
            matchToken?.isRevoked
            || !matchToken
        ) {
            return NextResponse.json({
                ok: false,
                message: "refresh token is expired",
            }, {
                status: 401
            });
        }

        const accessToken =

        return NextResponse.json({
            ok: true,
            token: findToken,
        });
    } catch (_) {
        return returnInternalServerError();
    }
}