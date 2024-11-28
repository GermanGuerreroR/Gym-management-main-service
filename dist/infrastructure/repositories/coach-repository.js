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
exports.CoachRepository = void 0;
const data_source_1 = require("./config/data-source");
class CoachRepository {
    addCoach(coach) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const insertPersonalInfoSQL = `INSERT INTO coaches (name, gender, date_birth, email, user_name, password) VALUES(?,?,?,?,?,?)`;
            const personalInfoValues = [coach.personalInfo.name,
                coach.personalInfo.gender,
                coach.personalInfo.dateBirth,
                coach.personalInfo.email,
                coach.personalInfo.userName,
                coach.personalInfo.password
            ];
            const result = yield connection.query(insertPersonalInfoSQL, personalInfoValues);
            return result[0];
        });
    }
    getCoaches() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `SELECT * FROM coaches`;
            const result = yield connection.query(querySQL);
            return result[0];
        });
    }
    getCoach(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `SELECT * FROM coaches WHERE id_coach = ?;`;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
    updateCoach(coach, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `UPDATE coaches SET name= ?, gender=?, date_birth=?, email=?, user_name=?, password=?  WHERE id_coach =?`;
            const values = [coach.personalInfo.name, coach.personalInfo.gender, coach.personalInfo.dateBirth, coach.personalInfo.email, coach.personalInfo.userName, coach.personalInfo.password, id];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
    deleteCoach(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `DELETE FROM coach WHERE id_coach = ? `;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
}
exports.CoachRepository = CoachRepository;
