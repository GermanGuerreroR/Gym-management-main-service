import { Gender } from "../enum/apprentice-enum/gender";

export interface PersonalInfo {
    id?: number;
    name: string;
    gender: Gender;
    dateBirth: Date;
    email: string;
    userName: string;
    password: string;
}