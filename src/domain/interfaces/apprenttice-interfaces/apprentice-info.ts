import { FitnessLevel } from "../../enum/apprentice-enum/fitness-level";
import { TrainingGoals } from "../../enum/apprentice-enum/training-goal";

export interface ApprenticeAdditionalInfoInteface {
    idApprenticeAditional?: number;
    trainingGoal: TrainingGoals;
    fitnessLevel: FitnessLevel;
    weight: number;
    height: number;
    idCoachFk: number
}