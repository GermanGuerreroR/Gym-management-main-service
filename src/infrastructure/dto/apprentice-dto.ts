import { IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Min, MinLength, validate, ValidateIf } from "class-validator";
import { FitnessLevel } from "../../domain/enum/apprentice-enum/fitness-level";
import { Gender } from "../../domain/enum/apprentice-enum/gender";
import { TrainingGoals } from "../../domain/enum/apprentice-enum/training-goal";

export class ApprenticeDto {
    @IsString()
    @MinLength(10)
    name: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsDate()
    dateBirth: Date;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    userName: string;

    @IsStrongPassword()
    password: string;


    //ApprenticesAdditionalInfo

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

    //Custom trainingGoal

    @ValidateIf(x => x.trainingGoal === TrainingGoals.Other)
    @IsString()
    @IsNotEmpty()
    customGoalDescription?: string;


    @IsOptional()
    @IsNumber()
    @Min(1)
    idCoachFkCustom?: number;


    constructor(
        personalInfo: { name: string; gender: Gender; dateBirth: Date; email: string; userName: string; password: string },
        apprenticeAdditionalInfo: { trainingGoal: TrainingGoals, fitnessLevel: FitnessLevel, weight: number, height: number, idCoachFk: number },
        customTrainingGoalInfo?: { customGoalDescription?: string, idCoachFkCustom?: number }
    ) {


        this.name = personalInfo.name;
        this.gender = personalInfo.gender;
        this.dateBirth =
            personalInfo.dateBirth instanceof Date ? personalInfo.dateBirth : new Date(personalInfo.dateBirth);
        this.email = personalInfo.email;
        this.userName = personalInfo.userName;
        this.password = personalInfo.password;


        this.trainingGoal = apprenticeAdditionalInfo.trainingGoal;
        this.fitnessLevel = apprenticeAdditionalInfo.fitnessLevel;
        this.weight = apprenticeAdditionalInfo.weight;
        this.height = apprenticeAdditionalInfo.height;
        this.idCoachFk = apprenticeAdditionalInfo.idCoachFk;


        if (customTrainingGoalInfo) {
            this.customGoalDescription = customTrainingGoalInfo.customGoalDescription;

        }




    }

    async validateDto() {
        return await validate(this, {
            validationError: { target: false, value: false },
        });
    }
}