import { ProfessionalDetailsInfo } from "../../domain/interfaces/coach-interfaces/professional-details-info";
import { ProfessionalDetailsDTO } from "../../infrastructure/dto/professional-details";
import { ProfessionalDetails } from "../../domain/models/ProfessionalDetails";
import { ProfessionalDetailsRepository } from "../../infrastructure/repositories/professional-details";
import { validationID } from "../utils/validationID";

export class ProfessionalDetailsController {
    constructor(private repository = new ProfessionalDetailsRepository()) { };

    async add(
        professionalDetailsInfo: ProfessionalDetailsInfo
    ) {
        try {
            console.log(professionalDetailsInfo);
            const DTO = new ProfessionalDetailsDTO(professionalDetailsInfo);
            const errors = await DTO.validateDto();
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const professionalDetails = new ProfessionalDetails(professionalDetailsInfo);
            const result = await this.repository.addProfessionalDetailsInfo(professionalDetails, professionalDetails.professionalDetails.idCoachFk);
            return result;
        } catch (error: any) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        };
    }

    async getId(id: number) {
        try {
            if (validationID(id)) return validationID(id);
            const result = await this.repository.getProfessionalDetail(id);
            return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "professional details not founded." };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async update(professionalDetailsInfo: ProfessionalDetailsInfo, id: number) {
        try {
            const DTO = new ProfessionalDetailsDTO(professionalDetailsInfo);
            const errors = await DTO.validateDto();
            if (validationID(id)) return validationID(id);
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const professionalDetails = new ProfessionalDetails(professionalDetailsInfo);
            const result = await this.repository.updateCoachProfessionalDetails(professionalDetails, id);
            return result.affectedRows === 1 ? { ok: true, message: `The coach with ID ${id} has updated his professional details ` } : { ok: false, msg: `The professional details with the ID ${id} was not founded` }
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

}