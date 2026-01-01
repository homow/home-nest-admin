import {z} from "zod";
import {NextRequest} from "next/server";

export type ValidateBodyTypes<T extends z.ZodTypeAny> = {
    req: NextRequest;
    schema: T;
    message: string;
};