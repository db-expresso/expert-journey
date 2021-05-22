import { Request, } from "express";

export interface headerInterface extends Request {
    name: string;
}
