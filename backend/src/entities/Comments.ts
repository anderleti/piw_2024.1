import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './User';
import { Artwork } from './Artwork';

@Entity ()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    date: Date;

    @Column()
    text: string;

    @ManyToOne( () => User, user=> user)
    user: User;

    @ManyToOne( () => Artwork, artwork=> artwork.id)
    artwork: Artwork;
};
