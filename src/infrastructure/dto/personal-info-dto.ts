import {
    IsEmail,
    IsString,
    IsNumber,
    MinLength,
    IsStrongPassword,
    Min,
    IsDate,
    validate,
    IsEnum,
    IsOptional,
} from 'class-validator';
import { Educationlevel } from '../../domain/enum/coach-enum/education-level';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Gender } from '../../domain/enum/apprentice-enum/gender';

export class PersonalInfoDTO {
    // Personal Info -->
    @IsString()
    @MinLength(10)
    name: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsEmail()
    email: string;

    @IsDate()
    @Type(() => Date)
    dateBirth: Date;

    @IsString()
    @MinLength(5)
    userName: string;

    @IsStrongPassword()
    @MinLength(8)
    password: string;
    constructor(
        personalInfo: { name: string; gender: Gender; dateBirth: Date; email: string; userName: string; password: string }
    ) {
        // Personal Info
        this.name = personalInfo.name;
        this.gender = personalInfo.gender;
        this.dateBirth =
            personalInfo.dateBirth instanceof Date ? personalInfo.dateBirth : new Date(personalInfo.dateBirth);
        this.email = personalInfo.email;
        this.userName = personalInfo.userName;
        this.password = personalInfo.password;

    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}
