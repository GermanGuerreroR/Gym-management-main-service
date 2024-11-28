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
exports.SpecialityRepository = void 0;
const data_source_1 = require("./config/data-source");
class SpecialityRepository {
    addSpeciality(speciality, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const inserSpecialityInfoSQL = `INSERT INTO specialities ( specialty_name, id_coach_fk) VALUES(?,?)`;
            const specialityInfoValues = [speciality.specialityInfo.specialityName, id];
            const result = yield connection.query(inserSpecialityInfoSQL, specialityInfoValues);
            return result[0];
        });
    }
    getSpecialities() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `SELECT * FROM specialities;`;
            const result = yield connection.query(querySQL);
            return result[0];
        });
    }
    getSpeciality(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `SELECT * FROM specialities WHERE id_coach_fk = ?;`;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
    updateSpeciality(speciality, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `UPDATE specialities SET specialty_name= ?  WHERE id_coach_fk =?`;
            const values = [speciality.specialityInfo.specialityName, id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
    deleteSpeciality(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `DELETE FROM speciality WHERE id_coach_fk = ? `;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
}
exports.SpecialityRepository = SpecialityRepository;
