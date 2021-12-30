import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemEntity, ItemDatabaseName, ItemSchema } from 'src/item/item.schema';
import { ItemService } from 'src/item/item.service';
import { ItemController } from 'src/item/item.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ItemEntity.name,
                schema: ItemSchema,
                collection: ItemDatabaseName
            }
        ]),
    ],
    exports: [ItemService],
    providers: [ItemService],
    controllers: [ItemController]
})
export class ItemModule {}
