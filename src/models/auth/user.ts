import {type Model, model, models, Schema} from "mongoose";
import {emailRegex} from "@/lib/auth-utils";
import {UserDB, UserRoles} from "@/types/models";

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
            enum: Object.values(UserRoles),
            default: UserRoles.USER,
            required: true,
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

const UserModel: Model<UserDB> =
    models.Users || model("Users", UserSchema);

export {UserModel};