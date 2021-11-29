import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from 'src/user/user.schema';
import { UserDocument,IUserCreate } from 'src/user/user.interface';
import { MessageService } from 'src/message/message.service';
import { Message } from 'src/message/message.decorator';
import { UserProfileTransformer } from './transformer/user.profile.transformer';
import { plainToClass } from 'class-transformer';
import { UserLoginTransformer } from './transformer/user.login.transformer';
import { Helper } from 'src/helper/helper.decorator';
import { HelperService } from 'src/helper/helper.service';
import { IErrors } from 'src/error/error.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly userModel: Model<UserDocument>,
        @Helper() private readonly helperService: HelperService,
        @Message() private readonly messageService: MessageService
    ) {}

    async findAll<T>(
        find?: Record<string, any>,
        options?: Record<string, any>
    ): Promise<T[]> {
        const findAll = this.userModel
            .find(find)
            .skip(options && options.skip ? options.skip : 0);

        if (options && options.limit) {
            findAll.limit(options.limit);
        }

        return findAll.lean();
    }

    async getTotalData(find?: Record<string, any>): Promise<number> {
        return this.userModel.countDocuments(find);
    }

    async mapProfile(data: UserDocument): Promise<UserProfileTransformer> {
        return plainToClass(UserProfileTransformer, data);
    }

    async mapLogin(data: UserDocument): Promise<UserLoginTransformer> {
        return plainToClass(UserLoginTransformer, data);
    }

    async findOneById<T>(userId: string): Promise<T> {
        const user = this.userModel.findById(userId);



        return user.lean();
    }

    async findOne<T>(
        find?: Record<string, any>
    ): Promise<T> {
        const user = this.userModel.findOne(find);

        return user.lean();
    }

    async create(data: Record<string, any>): Promise<UserDocument> {
        const salt: string = await this.helperService.randomSalt();
        const passwordHash = await this.helperService.bcryptHashPassword(
            data.password,
            salt
        );

        const newUser: UserEntity = {
            names: data.names.toLowerCase(),
            email: data.email.toLowerCase(),
            mobileNumber: data.mobileNumber,
            password: passwordHash,
            activated: false
        };

        const create: UserDocument = new this.userModel(newUser);
        return create.save();
    }


    async checkExist(
        email: string,
        mobileNumber: string
    ): Promise<IErrors[]> {
        const existEmail: UserDocument = await this.userModel
            .findOne({
                email: email
            })
            .lean();

        const existMobileNumber: UserDocument = await this.userModel
            .findOne({
                mobileNumber: mobileNumber
            })
            .lean();

        const errors: IErrors[] = [];
        if (existEmail) {
            errors.push({
                message: this.messageService.get('user.error.emailExist'),
                property: 'email'
            });
        }
        if (existMobileNumber) {
            errors.push({
                message: this.messageService.get(
                    'user.error.mobileNumberExist'
                ),
                property: 'mobileNumber'
            });
        }

        return errors;
    }
    async createMany(data: IUserCreate[]): Promise<boolean> {
        for (const val of data){
            const salt: string = await this.helperService.randomSalt();
            const passwordHash = await this.helperService.bcryptHashPassword(
                val.password,
                salt
            );
    
                val.names= val.names.toLowerCase(),
                val.email= val.email.toLowerCase(),
                val.mobileNumber= val.mobileNumber,
                val.password= passwordHash
        }



        return new Promise((resolve, reject) => {
            this.userModel
                .insertMany(data)
                .then(() => {
                    resolve(true);
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }

    async deleteMany(find: Record<string, any>): Promise<boolean> {
        try {
            await this.userModel.deleteMany(find);
            return true;
        } catch (e: unknown) {
            return false;
        }
    }
}
