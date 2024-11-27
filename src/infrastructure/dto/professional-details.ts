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
    isEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { Educationlevel } from '../../domain/enum/coach-enum/education-level';

export class ProfessionalDetailsDTO {
    // Personal Info -->
    @IsNumber()
    experience: number;


    @IsEnum(Educationlevel)
    educationLevel: Educationlevel;


    @IsNumber()
    @Min(1)
    idCoachFk: number;

    constructor(
        public coachProfessionalInfo: { experience: number, educationLevel: Educationlevel, idCoachFk: number },
    ) {
        this.experience = coachProfessionalInfo.experience;
        this.educationLevel = this.coachProfessionalInfo.educationLevel;
        this.idCoachFk = this.coachProfessionalInfo.idCoachFk;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}
