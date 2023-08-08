import { TypeOrmModuleOptions } from "@nestjs/typeorm";


console.log(process.env.DATABASE_USER)
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'toor',
  database: 'nestdb01',
  entities: [
    "dist/**/*.entity.js"
  ],
  synchronize: true,
}