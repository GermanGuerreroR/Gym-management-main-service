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
exports.CertificationRepository = void 0;
const data_source_1 = require("./config/data-source");
class CertificationRepository {
    addCertification(certification, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const insertCertificationInfoSQL = `INSERT INTO certifications (certification_name, certification_date,  certifying_entity, id_coach_fk) VALUES (?,?,?,?)`;
            const certificationInfoValues = [
                certification.certificationName,
                certification.certificationDate,
                certification.certifyingEntity,
                id
            ];
            const result = yield connection.query(insertCertificationInfoSQL, certificationInfoValues);
            return result[0];
        });
    }
    getCertifications() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `SELECT * FROM certifications;`;
            const result = yield connection.query(querySQL);
            return result[0];
        });
    }
    getCertification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `SELECT * FROM certifications WHERE id_coach_fk = ?;`;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
    updateCertification(certification, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `UPDATE certifications SET certification_name= ?, certification_date=?, certifying_entity=? WHERE id_coach_fk =?`;
            const values = [certification.certificationInfo.certificationName, certification.certificationInfo.certificationDate, certification.certificationInfo.certifyingEntity, id];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
    deleteCertification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `DELETE FROM certifications WHERE id_coach_fk = ? `;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
}
exports.CertificationRepository = CertificationRepository;
