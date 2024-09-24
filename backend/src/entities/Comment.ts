import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './User';
import { Artwork } from './Artwork';

@Entity ()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    date: Date;

    @ManyToOne( () => User, user=> user)
    users: User[];

    @ManyToOne( () => User, user=> user)
    artwork: Artwork;
};
