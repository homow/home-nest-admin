export enum UserRoles {
    USER = "user",
    ADMIN = "admin",
    SUPER_ADMIN = "super_admin",
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
    _id: string;
    password: string;
}

export interface UserPublic extends UserBase {
    id: string;
}