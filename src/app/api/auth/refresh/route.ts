import {cookies} from "next/headers";
import {JwtPayload} from "jsonwebtoken";
import {NextResponse} from "next/server";
import RefreshTokenModel from "@/models/auth/RefreshToken";
import {returnInternalServerError} from "@/lib/utils/api-utils/utils";
import {
    compareSecret,
    verifyToken,
    generateToken
} from "@/lib/utils/auth-utils/auth";
import {setAccessToken} from "@/lib/server-utils/cookies";

export async function POST() {
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

        const accessToken: string = generateToken({
            id: matchToken.userId,
        }, "1h");

        await setAccessToken(accessToken);

        return NextResponse.json({
            ok: true,
            accessToken,
        });
    } catch (_) {
        return returnInternalServerError();
    }
}