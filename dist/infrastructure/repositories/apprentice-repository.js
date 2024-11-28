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
exports.ApprenticeRepository = void 0;
const data_source_1 = require("./config/data-source");
class ApprenticeRepository {
    addApprentice(apprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const insertPersonalApprenticeInfoSQL = 'INSERT INTO apprentices (name, gender, date_birth, email, user_name, password ) VALUES(?, ?, ?, ?, ?, ?)';
            const values = [apprentice.personalInfo.name, apprentice.personalInfo.gender, apprentice.personalInfo.dateBirth, apprentice.personalInfo.email, apprentice.personalInfo.userName, apprentice.personalInfo.password];
            const result = yield connection.query(insertPersonalApprenticeInfoSQL, values);
            return result[0];
        });
    }
    getApprentices() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `SELECT * FROM apprentices`;
            const result = yield connection.query(querySql);
            return result[0];
        });
    }
    getApprentice(idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `SELECT * FROM apprentices WHERE id_apprentice = ?`;
            const values = [idApprentice];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
    updateApprentice(apprentice, idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `UPDATE apprentices SET name = ?, gender = ?, date_birth = ?, email=?, user_name=?, password = ?  WHERE id_apprentice = ?`;
            const values = [
                apprentice.personalInfo.name,
                apprentice.personalInfo.gender,
                apprentice.personalInfo.dateBirth,
                apprentice.personalInfo.email,
                apprentice.personalInfo.userName,
                apprentice.personalInfo.password, idApprentice
            ];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
    deleteApprentice(idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = ` DELETE FROM apprentices WHERE id_apprentice = ?`;
            const values = [idApprentice];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
}
exports.ApprenticeRepository = ApprenticeRepository;
