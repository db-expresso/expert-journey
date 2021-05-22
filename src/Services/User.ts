import { Response, } from "express";
import jwt from 'jsonwebtoken';
import User from '../Models/User';

class UserService {
    static async createUser(req: any,): Promise<any> {
        return await User.create({
            name: req.name,
            email: req.email,
            type: req.type,
            role: req.role,
            address: req.address,
            slug: req.slug,
            phone: req.phone,
            password: req.password,
            passwordConfirm: req.passwordConfirm,
        });
    }

    static async getUser(params: any, password: boolean = false): Promise<any>  {
        const query = User.findOne(params);
        if (password) query.select('+password');
        return await query;
    }

    static async verify(slug: string): Promise<any>  {
        return await User.findOneAndUpdate(
            { slug: slug },
            {
                verified: true,
            }
        );
    }

    static signToken(id: any): any {
        /**
         * @param {{JWT_EXPIRES_IN:string}} process.env
         */
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    }

    static createSendToken(user: any, statusCode: number, res: Response): void {
        /**
         * @param {{JWT_COOKIE_EXPIRES_IN:string}} process.env
         */
        const token = this.signToken(user._id);

        const expirationTime: number = parseInt(process.env.JWT_COOKIE_EXPIRES_IN);

        const cookieOptions = {
            expires : new Date(
                Date.now() +  expirationTime * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: undefined
        };

        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

        res.cookie('jwt', token, cookieOptions);

        // Remove password from output
        user.password = undefined;

        res.status(statusCode).json({
            status: 'success',
            token,
            data: user,
        });
    }
}

export default UserService;
