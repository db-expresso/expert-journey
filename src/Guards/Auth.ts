import { promisify } from 'util';
import { Request, Response, NextFunction, } from "express";
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';
import userService from '../Services/User';

class Auth{
  static async protect(req: any, res: Response, next: NextFunction,): Promise<void> {
    // 1) Getting token and check of it's there
    let token: string;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
          new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    // 2) Verification token
    /**
     * @param {{JWT_SECRET:string}} process.env
     */
    const decoded: any = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await userService.getUser({ _id: decoded.id });
    if (!currentUser) {
      return next(
          new AppError(
              'The user belonging to this token does no longer exist.',
              401
          )
      );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
          new AppError(
              'User recently changed password! Please log in again.',
              401
          )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  }

  static guest(req:Request, res:Response, next:NextFunction): void {
    let token: string;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      return next(new AppError('You have no permission here', 403));
    }

    next();
  }

}

export default Auth;
