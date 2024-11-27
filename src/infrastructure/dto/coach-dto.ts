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

export class CoachDto {
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

    // Professional Details -->
    @IsOptional()
    @IsNumber()
    @Min(1)
    idCoachFk?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    experience?: number;

    @IsOptional()
    @IsEnum(Educationlevel)
    educationLevel?: Educationlevel;

    // Certification -->
    @IsOptional()
    @IsString()
    certificationName?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    certificationDate?: Date;

    @IsOptional()
    @IsString()
    certifyingEntity?: string;

    // Speciality -->
    @IsOptional()
    @IsNumber()
    idCoachSpecialityFk?: number;

    @IsOptional()
    @IsString()
    specialityName?: string;

    constructor(
        personalInfo: { name: string; gender: Gender; dateBirth: Date; email: string; userName: string; password: string },
        professionalDetailsInfo?: { idCoachFk?: number; experience?: number; educationLevel?: Educationlevel },
        certificationInfo?: { certificationName?: string; certificationDate?: Date; certifyingEntity?: string },
        specialityInfo?: { idCoachSpeciality?: number; specialityName?: string }
    ) {
        // Personal Info
        this.name = personalInfo.name;
        this.gender = personalInfo.gender;
        this.dateBirth =
            personalInfo.dateBirth instanceof Date ? personalInfo.dateBirth : new Date(personalInfo.dateBirth);
        this.email = personalInfo.email;
        this.userName = personalInfo.userName;
        this.password = personalInfo.password;

        // Professional Details

        if (professionalDetailsInfo) {
            this.experience = professionalDetailsInfo.experience;
            this.educationLevel = professionalDetailsInfo.educationLevel;
            this.idCoachFk = professionalDetailsInfo.idCoachFk;
        }




        // Certification Info
        if (certificationInfo) {
            this.certificationName = certificationInfo.certificationName;
            this.certificationDate =
                certificationInfo.certificationDate instanceof Date
                    ? certificationInfo.certificationDate
                    : certificationInfo.certificationDate
                        ? new Date(certificationInfo.certificationDate)
                        : undefined;
            this.certifyingEntity = certificationInfo.certifyingEntity;
        }

        // Speciality Info
        if (specialityInfo) {
            this.idCoachSpecialityFk = specialityInfo.idCoachSpeciality;
            this.specialityName = specialityInfo.specialityName;
        }
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}
