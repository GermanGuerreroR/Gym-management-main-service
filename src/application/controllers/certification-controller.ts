import { CertificationInfo } from "../../domain/interfaces/coach-interfaces/certification-info";
import { CertificationRepository } from "../../infrastructure/repositories/certification-repository";
import { CertificationDTO } from "../../infrastructure/dto/certification-dto";
import { Certification } from "../../domain/models/Certification";
import { validationID } from "../utils/validationID";

export class CertificationController {
    constructor(private repository = new CertificationRepository()) { };

    async add(
        certificationInfo: CertificationInfo,
        idCoach: number
    ) {
        try {

            console.log(certificationInfo, idCoach);
            const DTO = new CertificationDTO(certificationInfo);
            const errors = await DTO.validateDto();
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const certification = new Certification(certificationInfo);

            const result = await this.repository.addCertification(certificationInfo, idCoach);
            return result ? { ok: true, msg: `Certifications added successfully`, id: `The coach's ID  ${result.insertId} charges with the new certification : ${certification.certificationInfo.certificationName}` } : { ok: false, message: "Certification not added." }
        } catch (error: any) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        };
    }

    async getAll() {
        try {
            const result = await this.repository.getCertifications();
            return result.length === 0 ? { ok: true, message: "There are no certifications." } : { ok: true, certifcations: result };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async getId(id: number) {
        try {
            if (validationID(id)) return validationID(id);
            const result = await this.repository.getCertification(id);
            return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "Certification not founded." };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async update(certificationInfo: { certificationName: string, certificationDate: Date, certifyingEntity: string, idCoachFk: number }, id: number) {
        try {
            const DTO = new CertificationDTO(certificationInfo)
            const errors = await DTO.validateDto();
            if (validationID(id)) return validationID(id);
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const certifcation = new Certification(certificationInfo);
            const result = await this.repository.updateCertification(certifcation, id);
            return result.affectedRows === 1 ? { ok: true, message: `The coach with ID ${id} was successfully updated ` } : { ok: false, msg: `The certification with the ID ${id} was not founded` }
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }
    async delete(id: number) {
        if (validationID(id)) return validationID(id);
        const result = await this.repository.deleteCertification(id);
        return result.affectedRows === 1 ? { ok: true, message: "Certification deleted" } : { ok: false, message: "Certification not founded" };
    }
}