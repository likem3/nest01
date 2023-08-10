import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService]
})
export class DatabaseModule {}
