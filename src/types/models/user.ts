import type {Types} from "mongoose";

export enum UserRoles {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
}

export interface UserBase {
    name?: string;
    email: string;
    role: UserRoles;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserDB extends UserBase {
    _id: Types.ObjectId;
    password: string;
    __v: number;
}

export interface UserPublic extends UserBase {
    id: string;
}

export interface RefreshToken {
    _id: Types.ObjectId;
    token: string;
    userId: Types.ObjectId;
    isRevoked: boolean;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}