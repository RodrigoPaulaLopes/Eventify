import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from '@nestjs/config';
import dotenv from "dotenv"

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
    entities: [],
    synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {

}
