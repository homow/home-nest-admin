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
}

export interface AddUserDB extends UserBase {
    password: string;
}

export interface GetUserDB extends UserBase {
    _id: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPublic extends UserBase {
    id: string;
}