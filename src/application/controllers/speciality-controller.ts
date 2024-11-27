
import { SpecialityInfo } from "../../domain/interfaces/coach-interfaces/speciality-info";
import { SpecialityDTO } from "../../infrastructure/dto/speciality-dto";
import { SpecialityRepository } from "../../infrastructure/repositories/speciality-repository";
import { Speciality } from "../../domain/models/Speciality";
import { validationID } from "../utils/validationID";

export class SpecialityController {
    constructor(private repository = new SpecialityRepository()) { };



    async add(specialityInfo: SpecialityInfo, id: number) {
        try {
            const DTO = new SpecialityDTO(specialityInfo);
            const errors = await DTO.validateDto();
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const speciality = new Speciality(specialityInfo)
            const result = await this.repository.addSpeciality(speciality, id);
            return result ? { ok: true, msg: `Speciality added successfully`, id: `Coach ${result.insertId}` } : { ok: false, message: "Speciality not added " }
        } catch (error: any) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        };
    }

    async getAll() {
        try {
            const result = await this.repository.getSpecialities()
            return result.length === 0 ? { ok: true, message: "There are no registered specialities" } : { ok: true, specialities: result };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async getId(id: number) {
        try {
            if (validationID(id)) return validationID(id);
            const result = await this.repository.getSpeciality(id);
            return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "Coach speciality not found." };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async update(specialityInfo: { specialityName: string, idCoachFk: number, }, id: number) {
        try {
            if (validationID(id)) return validationID(id);
            const dto = new SpecialityDTO(specialityInfo)
            const errores = await dto.validateDto();
            if (errores.length > 0) { return { ok: false, message: "The Request has error", error: errores } }
            const speciality = new Speciality(specialityInfo)
            const result = await this.repository.updateSpeciality(speciality, id)
            return result ? { ok: true, message: `The coach with the ID ${id} has update successfully the speciality ${specialityInfo.specialityName}` } : { ok: false, message: "Speciality was not updated" };
        } catch (error: any) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }
    async delete(id: number) {
        if (validationID(id)) return validationID(id);
        const result = await this.repository.deleteSpeciality(id)
        return result.affectedRows === 1 ? { ok: true, message: "Speciality deleted" } : { ok: false, message: "Speciality not deleted" };

    }

}

