import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ItemSeed } from './item.seed';
import { ItemModule } from 'src/item/item.module';
import { UserSeed } from './user.seed';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [CommandModule, ItemModule, UserModule],
    providers: [ ItemSeed, UserSeed],
    exports: []
})
export class SeedsModule {}
