import {type Model, model, models, Schema} from "mongoose";
import {emailRegex} from "@/lib/auth-utils";

type UserRole = "user" | "admin" | "super_admin";

interface UserSchemaType {
    name?: string;
    email: string;
    role: UserRole;
    password: string;
    isActive: boolean;
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: false,
            trim: true,
            maxlength: 30,
            minlength: 4,
        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user",
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: emailRegex
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

const UserModel: Model<UserSchemaType> =
    models.Users || model("Users", UserSchema);

export default UserModel;