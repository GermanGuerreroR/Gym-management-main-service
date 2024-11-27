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


export class CertificationDTO {
    // Personal Info -->
    @IsString()
    @MinLength(10)
    certificationName: string;

    @IsDate()
    @Type(() => Date)
    certificationDate: Date;

    @IsString()
    @MinLength(10)
    certifyingEntity: string;

    @IsOptional()
    @IsNumber()
    idCoachFk: number;

    constructor(
        public certificationInfo: { certificationName: string, certificationDate: Date, certifyingEntity: string, idCoachFk: number },
    ) {
        this.certificationName = certificationInfo.certificationName;
        this.certificationDate = certificationInfo.certificationDate instanceof Date
            ? certificationInfo.certificationDate
            : new Date(certificationInfo.certificationDate);
        this.certifyingEntity = certificationInfo.certifyingEntity;
        this.idCoachFk = certificationInfo.idCoachFk;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}
