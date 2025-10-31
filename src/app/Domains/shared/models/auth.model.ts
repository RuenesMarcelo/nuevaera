import { User } from './user.model';

export interface Auth{
    correo: string;
    contrasena: string;
    token: string,
    user: User,
}