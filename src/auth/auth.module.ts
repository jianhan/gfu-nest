import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}

// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { UsersModule } from '../users/users.module';
// import { PassportModule } from '@nestjs/passport';
// import { GoogleStrategy } from './strategies/google.strategy';

// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: 'jwt', session: false }),
//     JwtModule.register({
//       secretOrPrivateKey: 'thisismykickasssecretthatiwilltotallychangelater',
//       signOptions: {
//         expiresIn: 3600,
//       },
//     }),
//     UsersModule,
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy, GoogleStrategy],
// })
// export class AuthModule {}
