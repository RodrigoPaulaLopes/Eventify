import { ConfigModule } from "@nestjs/config"

ConfigModule.forRoot()
export const jwtConstants = {
    secret: process.env.SECRET,
}