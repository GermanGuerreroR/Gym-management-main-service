import { PersonalInfo } from "../interfaces/personal-info";
import { ApprenticeAdditionalInfoInteface } from "../interfaces/apprenttice-interfaces/apprentice-info";
import { CustomTrainingGoalInfoInterface } from "../interfaces/apprenttice-interfaces/custom-training-info";

export class Apprentice {
    constructor(
        public personalInfo: PersonalInfo,
        public apprenticeInfo: ApprenticeAdditionalInfoInteface,
        public customTrainingGoalInfo?: CustomTrainingGoalInfoInterface
    ) {
    }
}