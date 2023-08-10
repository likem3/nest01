import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueConstraint } from './utils/validators';
import { AuthModule } from './apps/auth/auth.module';
import { UsersModule } from './apps/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './configs/database.service';
import { DatabaseModule } from './configs/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (config: DatabaseConfigService) => config.typeOrmConfig,
      inject: [DatabaseConfigService]
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, IsUniqueConstraint],
})
export class AppModule {}
