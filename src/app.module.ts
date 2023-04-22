import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';


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
    entities: [User],
    synchronize: true,
  }), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {

}
