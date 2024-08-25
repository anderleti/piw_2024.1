import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from './User';
import { Artwork } from './Artwork';

@Entity ()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    date: string;

    @OneToOne( () => User, user=> user)
    users: User;

    @OneToOne( () => User, user=> user)
    artwork: Artwork;

};
