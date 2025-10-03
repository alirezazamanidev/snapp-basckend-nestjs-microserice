import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({nullable:true,unique:true})
    username: string;
    @Column({unique:true})
    phone: string;
    @Column({nullable:true})
    fullName: string;
    @Column({nullable:true,unique:true})
    email: string;
    @Column({default:false})
    isPhoneVerified: boolean;
    @Column({default:false})
    isEmailVerified: boolean;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}