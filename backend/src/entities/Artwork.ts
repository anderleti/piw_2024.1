import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinTable } from "typeorm";
import { Author } from './Author';

@Entity ()
export class Artwork {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;
    
    @Column()
    desc: string;

    @ManyToOne( ()=> Author, author => author.id)
    author!: Author; 

    @Column()
    date!: Date;

    @Column({nullable: true})
    medias!: string;

    @Column()
    tag!: string;

    @Column()
    likes!: number;
    
    @Column()
    comments!: number;
};

