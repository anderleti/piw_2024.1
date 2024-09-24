import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Like } from './Like';
import { Author } from './Author';

@Entity ()
export class Artwork {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;
    
    @Column()
    desc: string;

    @ManyToMany( ()=> Author, author => author.id)
    artwork!: Author[]; 

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

