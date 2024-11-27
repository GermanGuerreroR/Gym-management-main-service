import { CertificationInfo } from "../../domain/interfaces/coach-interfaces/certification-info";
import { ProfessionalDetailsInfo } from "../../domain/interfaces/coach-interfaces/professional-details-info";
import { SpecialityInfo } from "../../domain/interfaces/coach-interfaces/speciality-info";
import { PersonalInfo } from "../../domain/interfaces/personal-info";
import { Coach } from "../../domain/models/Coach";
import { ProfessionalDetails } from "../../domain/models/ProfessionalDetails";
import { CoachDto } from "../../infrastructure/dto/coach-dto";
import { CoachRepository } from "../../infrastructure/repositories/coach-repository";
import { ProfessionalDetailsRepository } from "../../infrastructure/repositories/professional-details";
import { validationID } from "../utils/validationID";
import { PersonalInfoClass } from "../../domain/models/PersonalInfo";

export class CoachController {
    constructor(
        private repositoryPersonalInfo = new CoachRepository(),
        private repositoryProfessionalDetails = new ProfessionalDetailsRepository()
    ) { };

    async add(
        personalInfo: PersonalInfo,
        coachProfessionalInfo: ProfessionalDetailsInfo,
        certificationInfo?: CertificationInfo,
        specialityInfo?: SpecialityInfo,
    ) {
        try {
            // console.log(personalInfo);
            console.log(coachProfessionalInfo);
            // console.log(certificationInfo);
            // console.log(specialityInfo);


            const dto = new CoachDto(personalInfo, coachProfessionalInfo, certificationInfo, specialityInfo);
            const errors = await dto.validateDto();
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const coach = new Coach
                (
                    personalInfo,
                    coachProfessionalInfo,
                    certificationInfo,
                    specialityInfo,
                );




            const personalInfoResult = await this.repositoryPersonalInfo.addCoach(coach);
            const professionalDetailsResult = await this.repositoryProfessionalDetails.addProfessionalDetailsInfo(new ProfessionalDetails(coachProfessionalInfo), personalInfoResult.insertId);


            return personalInfoResult.affectedRows === 1 && professionalDetailsResult ? { ok: true, msg: `Coach added successfully with`, id: `The new coach's ID  ${personalInfoResult.insertId}` } : { ok: false, message: "The training not added " }
        } catch (error: any) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        };

    }

    async getAll() {
        try {
            const result = await this.repositoryPersonalInfo.getCoaches();
            return result.length > 0 ? { ok: true, coaches: result } : { ok: true, message: "There are no registered coaches." }
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async getId(id: number) {
        try {
            if (validationID(id)) return validationID(id);
            const result = await this.repositoryPersonalInfo.getCoach(id);
            return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "Coach not found." };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async update(personalInfo: PersonalInfo, id: number) {
        try {
            if (validationID(id)) return validationID(id);
            const dto = new CoachDto(personalInfo);
            const errores = await dto.validateDto();
            if (errores.length > 0) return { ok: false, message: "The Request has error", error: errores }


            const coach = new PersonalInfoClass(personalInfo);
            const result = await this.repositoryPersonalInfo.updateCoach(coach, id)
            if (result.affectedRows === 1) return { ok: true, message: `The coach with ID ${id} was successfully updated` };

        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }

    }


    async delete(id: number) {
        if (validationID(id)) return validationID(id);
        const result = await this.repositoryPersonalInfo.deleteCoach(id);
        return result.affectedRows === 1 ? { ok: true, message: "Coach deleted" } : { ok: false, message: "No se pudo borrar el coach" };
    }
}