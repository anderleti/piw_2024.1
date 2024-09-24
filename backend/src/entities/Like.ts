import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from './User';
import { Artwork } from './Artwork';

@Entity ()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( () => User, user=> user)
    user: User;

    @ManyToOne( () => Artwork, artwork=> artwork.id)
    artwork: Artwork;
};
