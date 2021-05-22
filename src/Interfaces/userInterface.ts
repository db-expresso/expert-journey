import { Document, } from "mongoose";

export interface UserInterface extends Document {
    name: string;
    email: string;
    phone: string;
    role: string;
    userToken: string;
    type: string;
    slug: string;
    address: string;
    verified: boolean;
    password: string;
    passwordConfirm: string;
    created_at: Date;
    updated_at: Date;
    passwordChangedAt: Date;
    passwordResetToken: string;
    passwordResetExpires: Date;
    active: boolean;
}
