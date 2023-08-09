import { BaseCustomEntity } from "src/utils/entity";
import { Column, Entity } from "typeorm"


@Entity('users')
export class User extends BaseCustomEntity {
    @Column()
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    first_name: string;

    @Column()
    password: string;

    @Column()
    last_name: string;

    @Column({ default: true })
    is_active: boolean;
}