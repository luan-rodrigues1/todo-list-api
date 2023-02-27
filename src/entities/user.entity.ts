import { hashSync } from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeRemove } from "typeorm";
import { Task } from "./task.entity";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
    @Column({default: true})
    isActive: boolean
    
    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => Task, task => task.user)
    tasks: Task[]

    @BeforeUpdate()
    @BeforeInsert()
    hasPassword(){
        this.password = hashSync(this.password, 10)
    }
}

export {User}