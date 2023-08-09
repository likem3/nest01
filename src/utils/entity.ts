import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export class BaseCustomEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: 'data identifier',
    })
    id: number;

    @CreateDateColumn({
        comment: 'data creatiion datetime',
        type: "timestamptz"
    })
    created_at: Date;

    @UpdateDateColumn({
        comment: "data update datetime",
        type: "timestamptz"
    })
    updated_at: Date;

    @DeleteDateColumn()
    public deletedAt: Date;
}