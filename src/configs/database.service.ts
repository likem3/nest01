import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigService {
    get typeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres', // Use 'postgres' for PostgreSQL
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT, 10) || 5432, // Default PostgreSQL port
            username: process.env.DB_USER || '',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || '',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
        };
    }
}
