import {
    getRequestBody,
    returnInternalServerError
} from "@/lib/utils/api-utils/utils";
import {
    compareSecret,
    generateToken,
    hashSecret
} from "@/lib/utils/auth-utils/auth";
import {cookies} from "next/headers";
import {UserModel} from "@/models/auth";
import connectToDB from "@/lib/db/mongo";
import {UserPublic} from "@/types/models";
import {userSchema} from "@/validations/auth";
import RefreshTokenModel from "@/models/auth/refreshToken";
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
    const {email, password, remember} = resValidate.data;

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

        const cookieStore = await cookies();

        // set refresh token
        cookieStore.set({
            name: "refreshToken",
            value: refreshToken,
            httpOnly: true,
            maxAge: remember
                ? 7 * 24 * 60 * 60
                : 24 * 60 * 60,
            expires: remember
                ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                : new Date(Date.now() + 24 * 60 * 60 * 1000),
            sameSite: "strict",
            path: "/",
            secure: process.env.NODE_ENV === "production"
        });

        // set access token
        cookieStore.set({
            name: "accessToken",
            value: accessToken,
            httpOnly: true,
            maxAge: 60 * 60,
            expires: new Date(Date.now() + 60 * 60 * 1000),
            sameSite: "strict",
            path: "/",
            secure: process.env.NODE_ENV === "production",
        });

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