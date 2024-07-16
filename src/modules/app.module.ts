import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pin } from '../db-access/entities/pin.entuty';
import { User } from '../db-access/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../assets/constants/jwt';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { PinModule } from './pin.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PinModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [User, Pin],
      synchronize: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s'},
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
