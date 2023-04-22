import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { OrganizerCategoryModule } from './organizer_category/organizer_category.module';
import { OrganizerCategory } from './organizer_category/OrganizerCategory.entity';


@Module({
  imports: [
  ConfigModule.forRoot(), 
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [User, OrganizerCategory],
    synchronize: true,
  }), UsersModule, OrganizerCategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {

}
