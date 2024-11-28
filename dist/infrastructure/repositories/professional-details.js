"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalDetailsRepository = void 0;
const data_source_1 = require("./config/data-source");
class ProfessionalDetailsRepository {
    addProfessionalDetailsInfo(professionalDetails, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const insertProfessionalDetailsInfoSQL = `INSERT INTO coaches_professional_details ( experience ,education_level,id_coach_fk) VALUES(?,?,?)`;
            const professionalInfoValues = [professionalDetails.professionalDetails.experience, professionalDetails.professionalDetails.educationLevel, id];
            const result = yield connection.query(insertProfessionalDetailsInfoSQL, professionalInfoValues);
            return result[0];
        });
    }
    getProfessionalDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `SELECT * FROM coaches_professional_details WHERE id_coach_fk=?`;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
    updateCoachProfessionalDetails(professionalDetails, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `UPDATE coaches_professional_details SET  experience=?, education_level=?  WHERE id_coach_fk =?`;
            const values = [professionalDetails.professionalDetails.experience, professionalDetails.professionalDetails.educationLevel, id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
}
exports.ProfessionalDetailsRepository = ProfessionalDetailsRepository;
