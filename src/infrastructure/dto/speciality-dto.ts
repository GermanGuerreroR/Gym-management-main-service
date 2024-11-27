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
import { Type } from 'class-transformer';
import 'reflect-metadata';


export class SpecialityDTO {

    @IsString()
    @MinLength(10)
    specialityName: string

    @IsOptional()
    @IsNumber()
    @Min(1)
    idCoachFk: number;

    constructor(
        public specialityInfo: { specialityName: string, idCoachFk: number },
    ) {
        this.specialityName = specialityInfo.specialityName;
        this.idCoachFk = specialityInfo.idCoachFk;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}
