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
    _id: string;
    password: string;
}

export interface UserPublic extends UserBase {
    id: string;
}