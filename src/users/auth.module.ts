import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
