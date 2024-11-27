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

import { FitnessLevel } from '../../domain/enum/apprentice-enum/fitness-level';
import { TrainingGoals } from '../../domain/enum/apprentice-enum/training-goal';



export class ApprentinceAdditionalInfoDTO {
    // Personal Info -->
    @IsEnum(TrainingGoals)
    trainingGoal: TrainingGoals;

    @IsEnum(FitnessLevel)
    fitnessLevel: FitnessLevel;

    @IsNumber()
    @Min(5)
    weight: number;


    @IsNumber()
    @Min(0.50)
    height: number;

    @IsNumber()
    @Min(1)
    idCoachFk: number;

    constructor(
        public apprenticeAdditionalInfo: { trainingGoal: TrainingGoals, fitnessLevel: FitnessLevel, weight: number, height: number, idCoachFk: number },
    ) {
        this.trainingGoal = apprenticeAdditionalInfo.trainingGoal;
        this.fitnessLevel = apprenticeAdditionalInfo.fitnessLevel;
        this.weight = apprenticeAdditionalInfo.weight;
        this.height = apprenticeAdditionalInfo.height;
        this.idCoachFk = apprenticeAdditionalInfo.idCoachFk;
    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}
