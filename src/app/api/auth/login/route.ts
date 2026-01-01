import {
    returnInternalServerError,
    validateBody
} from "@/lib/utils/api-utils/utils";
import {
    compareSecret,
    generateToken,
    hashSecret
} from "@/lib/utils/auth-utils/auth";
import {UserModel} from "@/models/auth";
import connectToDB from "@/lib/db/mongo";
import {UserPublic} from "@/types/models";
import {userSchema} from "@/validations/auth";
import RefreshTokenModel from "@/models/auth/RefreshToken";
import {type NextRequest, NextResponse} from "next/server";
import {setAccessToken, setRefreshToken} from "@/lib/server-utils";

export async function POST(req: NextRequest) {
    const body = await validateBody({
        req,
        schema: userSchema,
        messageForRequired: "email and password required"
    });

    if (body instanceof NextResponse) return body;

    const {email, password, remember} = body;

    try {
        await connectToDB();
        const user = await UserModel.findOne({email}).lean();

        if (!user) {
            return NextResponse.json({
                ok: false,
                message: "Invalid email or password",
            }, {
                status: 401
            });
        }

        const isValidPassword: boolean = await compareSecret(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json({
                ok: false,
                message: "Invalid email or password",
            }, {
                status: 401
            });
        }

        const userPublic: UserPublic = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        };

        const refreshToken: string = generateToken({
            id: userPublic.id,
            role: user.role,
            remember: !!remember
        }, remember ? "7d" : "24h");

        const accessToken: string = generateToken({
            id: userPublic.id,
        }, "1h");

        const hashedRefreshToken: string = await hashSecret(refreshToken);

        await RefreshTokenModel.create({
            userId: user._id,
            token: hashedRefreshToken,
            expiresAt: remember
                ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                : new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        // set tokens
        await setRefreshToken(refreshToken, remember);
        await setAccessToken(accessToken);

        return NextResponse.json({
            ok: true,
            message: "login successfully",
            user: userPublic,
            accessToken
        });
    } catch (_) {
        return returnInternalServerError();
    }
}