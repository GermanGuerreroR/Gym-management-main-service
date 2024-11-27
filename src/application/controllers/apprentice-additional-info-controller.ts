import { ApprenticeAdditionalInfo } from "../../domain/models/ApprenticeAdditionalInfo";
import { ApprentinceAdditionalInfoDTO } from "../../infrastructure/dto/apprentice-additiona-info-dto";
import { ApprenticeAdditionalInfoInteface } from "../../domain/interfaces/apprenttice-interfaces/apprentice-info";
import { validationID } from "../utils/validationID";
import { AprenticeAdditionalInfoRepository } from "../../infrastructure/repositories/apprentice-additional-info-repository";

import { TrainingGoals } from "../../domain/enum/apprentice-enum/training-goal";
import { FitnessLevel } from "../../domain/enum/apprentice-enum/fitness-level";

export class ApprenticeAdittionalInfoController {
    constructor(private repository = new AprenticeAdditionalInfoRepository()) { };

    async add(
        apprenticeAdditionalInfo: ApprenticeAdditionalInfoInteface,
        id: number
    ) {
        try {
            const DTO = new ApprentinceAdditionalInfoDTO(apprenticeAdditionalInfo);
            const errors = await DTO.validateDto();
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const additionalInfo = new ApprenticeAdditionalInfo(apprenticeAdditionalInfo);
            const result = await this.repository.addApprenticeAdditionalInfo(additionalInfo, id);
            return result;
        } catch (error: any) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        };
    }

    async getId(id: number) {
        try {
            if (validationID(id)) return validationID(id);
            const result = await this.repository.getApprenticeAdditionalInfo(id);
            return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "Additional info not founded." };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async update(apprenticeAdditionalInfo: { trainingGoal: TrainingGoals, fitnessLevel: FitnessLevel, weight: number, height: number, idCoachFk: number }, id: number) {
        try {
            const DTO = new ApprentinceAdditionalInfoDTO(apprenticeAdditionalInfo);
            const errors = await DTO.validateDto();
            if (validationID(id)) return validationID(id);
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const additionalInfo = new ApprenticeAdditionalInfo(apprenticeAdditionalInfo);
            const result = await this.repository.updateAdditionalApprenticeAdditionalInfo(additionalInfo, id);
            return result.affectedRows === 1 ? { ok: true, message: `The apprentices information with ID ${id} was successfully updated ` } : { ok: false, msg: `The apprentices additional info with the ID ${id} was not founded` }
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

}