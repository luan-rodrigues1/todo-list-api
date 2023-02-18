import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { User } from "./user.entity";

@Entity("tasks")
class Task {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({length: 50})
    name : string

    @Column({length: 10})
    level_importance: string

    @Column({length: 300, nullable: true})
    description?: string

    @Column()
    category : string

    @Column({default: false})
    status : boolean

    @CreateDateColumn()
    created_at : Date

    @ManyToOne(() => User, user => user.tasks)
    user: User
    
}

export {Task}