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


export class TrainingActivityDTO {


    @IsNumber()
    @Min(1)
    idApprenticeFk: number;

    @IsNumber()
    @Min(1)
    idCoachFk: number;

    @IsNumber()
    @Min(1)
    idCategoryFk: number;

    @IsNumber()
    @Min(1)
    durationMinutes: number;

    @IsDate()
    @Type(() => Date)
    activityDate: Date;

    constructor(
        public trainingActivityInfo: { idApprenticeFk: number, idCoachFk: number, idCategoryFk: number, durationMinutes: number, activityDate: Date }
    ) {
        this.idApprenticeFk = trainingActivityInfo.idApprenticeFk;
        this.idCoachFk = trainingActivityInfo.idCoachFk;
        this.idCategoryFk = trainingActivityInfo.idCategoryFk;
        this.durationMinutes = trainingActivityInfo.durationMinutes;
        this.activityDate =
            trainingActivityInfo.activityDate instanceof Date ? trainingActivityInfo.activityDate : new Date(trainingActivityInfo.activityDate);

    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}
