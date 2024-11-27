import {
    IsString,
    IsNumber,
    MinLength,
    validate,
    IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { CustomTrainingGoalClass } from '../../domain/models/CustomTrainingGoal';


export class CustomTrainigGoalDTO {


    @IsString()
    @MinLength(10)
    customGoalDescription: string;
    constructor(
        public customTrainingGoal: { customGoalDescription: string },
    ) {
        this.customGoalDescription = customTrainingGoal.customGoalDescription;

    }
    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}
