import { Apprentice } from "../../domain/models/Apprentice";
import { ApprenticeDto } from "../../infrastructure/dto/apprentice-dto";
import { ApprenticeRepository } from "../../infrastructure/repositories/apprentice-repository";
import { validationID } from "../utils/validationID";
import { PersonalInfo } from "../../domain/interfaces/personal-info";
import { ApprenticeAdditionalInfo } from "../../domain/models/ApprenticeAdditionalInfo";
import { ApprenticeAdditionalInfoInteface } from "../../domain/interfaces/apprenttice-interfaces/apprentice-info";
import { CustomTrainingGoalInfoInterface } from "../../domain/interfaces/apprenttice-interfaces/custom-training-info";
import { AprenticeAdditionalInfoRepository } from "../../infrastructure/repositories/apprentice-additional-info-repository";
import { CoachRepository } from "../../infrastructure/repositories/coach-repository";
import { PersonalInfoDTO } from "../../infrastructure/dto/personal-info-dto";
import { PersonalInfoClass } from "../../domain/models/PersonalInfo";
import { CustomTrainingGoalRepository } from "../../infrastructure/repositories/custom-training-goal-repository";
import { CustomTrainingGoalClass } from "../../domain/models/CustomTrainingGoal";
import { CustomTrainigGoalDTO } from "../../infrastructure/dto/custom-training-goal-dto";

export class ApprenticeController {
    constructor(
        private repository = new ApprenticeRepository(),
        private repositoryTwo = new AprenticeAdditionalInfoRepository(),
        private repositoryFour = new CoachRepository(),
        private repositoryFive = new CustomTrainingGoalRepository()
    ) {
    }

    async add(
        personalInfo: PersonalInfo,
        apprenticeAdditionalInfo: ApprenticeAdditionalInfoInteface,
        customTrainingGoalInfo: CustomTrainingGoalInfoInterface) {
        try {
            const dto = new ApprenticeDto(personalInfo, apprenticeAdditionalInfo, customTrainingGoalInfo);
            const errors = await dto.validateDto();
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const apprentice = new Apprentice(personalInfo, apprenticeAdditionalInfo, customTrainingGoalInfo);
            const verification = await this.repositoryFour.getCoach(apprentice.apprenticeInfo.idCoachFk);
            if (verification.length > 0) {
                const result = await this.repository.addApprentice(apprentice);
                const resultTwo = await this.repositoryTwo.addApprenticeAdditionalInfo(new ApprenticeAdditionalInfo(apprenticeAdditionalInfo), result.insertId);
                if (customTrainingGoalInfo) {
                    const resultThree = await this.repositoryFive.addCustomTrainingGoal(new CustomTrainingGoalClass(customTrainingGoalInfo), result.insertId);
                }
                if (result && resultTwo) return { ok: true, msg: "Apprentice added successfully", id: `The new apprentice's ID ${result.insertId}` };
            }
            return { ok: false, message: "Error apprentice not added" }
        } catch (error: any) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        };
    }

    async getAll() {
        try {
            const result = await this.repository.getApprentices();
            if (result.length === 0) return { ok: true, message: "There are no registered apprentices." }
            return { ok: true, Apprentices: result };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async getId(idApprentice: number) {
        try {
            if (validationID(idApprentice)) return validationID(idApprentice);
            const result = await this.repository.getApprentice(idApprentice);
            if (result.length === 1) return { ok: true, message: result[0] }
            return { ok: false, message: "Apprentice not found." };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async update(personalInfo: PersonalInfo, idApprentice: number) {
        try {
            if (validationID(idApprentice)) return validationID(idApprentice);
            const dto = new PersonalInfoDTO(personalInfo);
            const errores = await dto.validateDto();
            if (errores.length > 0) return { ok: false, message: "The Request has error", error: errores };
            const apprentice = new PersonalInfoClass(personalInfo);
            const result = await this.repository.updateApprentice(apprentice, idApprentice)
            if (result.affectedRows === 1) return { ok: true, message: `The apprentice with ID ${idApprentice} was successfully updated` };
            return { ok: false, message: `The apprentice with ID ${idApprentice} was not found` };
        }
        catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async delete(idApprentice: number) {
        try {
            if (validationID(idApprentice)) return validationID(idApprentice);
            const result = await this.repository.deleteApprentice(idApprentice);
            if (result.affectedRows === 1) return { ok: true, message: `Apprentice with ID${result.insertId} has been deleted succesfully` };
            return { ok: false, message: `Apprentice with ID ${idApprentice} not found.` };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }
}



