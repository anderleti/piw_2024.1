import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity ()
export class Author{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    name!: string;
    
    @Column()
    bio!: string;

    @Column()
    photo!: string;
};

