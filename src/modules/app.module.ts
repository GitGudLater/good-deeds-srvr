import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Pin } from '../db-access/entities/pin.entuty';
import { User } from '../db-access/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../assets/constants/jwt';
import { UserService } from 'src/services/user.service';
import { PinService } from 'src/services/pin.service';
import { AuthService } from 'src/services/auth.service';
import { UserController } from 'src/controllers/user.controller';
import { PinController } from 'src/controllers/pin.controller';
import { AuthController } from 'src/controllers/auth.controller';
import { DBDalService } from 'src/db-access/dal/DAL';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from 'src/services/config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Pin]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}` /*jwtConstants.secret*/,
      signOptions: { expiresIn: '600s' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.DB_HOST}`,
      port: Number(`${process.env.DB_PORT}`),
      username: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB}`,

      entities: [User, Pin],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [PinController, UserController, AuthController],
  providers: [AuthService, JwtService, PinService, DBDalService, UserService, ConfigService],
})
export class AppModule {}
