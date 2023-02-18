import { hashSync } from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
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

    @OneToMany(() => Task, task => task.user)
    tasks: Task[]

    @BeforeUpdate()
    @BeforeInsert()
    hasPassword(){
        this.password = hashSync(this.password, 10)
    }
}

export {User}