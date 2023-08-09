import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/db';
import { IsUniqueConstraint } from './utils/validators';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService, IsUniqueConstraint],
})
export class AppModule {}
