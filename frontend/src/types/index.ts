export type User = {
    id: number
    name: string
    username: string
    password: string
    email: string
    role: Role;
  }

export type Role = {
    id: number
    name: string
  }

export type Author = {
    id: number;
    username: string;
    name: string;
    bio: string;
    photo:any;
}

export type Artwork = {
  id: number;
  title: string;
  desc: string;
  author: Author;
  date: Date;
  medias: string[];
  tag: string;
  likes: number;
  comments: number;
}