import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Like } from './Like';

@Entity ()
export class Artwork {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    desc: string;
    
    @Column()
    tags: string[];

    @Column()
    authors: string[];

    @Column()
    date: string[];

    @Column()
    medias: [];

    @OneToMany( ()=> Like, like => like.artwork)
    likes: Like[]; 

};

