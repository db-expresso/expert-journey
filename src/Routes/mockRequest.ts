import {Request} from "express"

export interface MockRequest extends Request {
  requestTime: string;
}
