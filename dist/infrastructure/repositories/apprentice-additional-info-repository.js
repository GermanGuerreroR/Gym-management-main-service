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
exports.AprenticeAdditionalInfoRepository = void 0;
const data_source_1 = require("./config/data-source");
class AprenticeAdditionalInfoRepository {
    addApprenticeAdditionalInfo(apprenticeAdditionalInfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const insertAdditionalInfoSQL = `INSERT INTO apprentices_additional_info (training_goal, fitness_level, weight, height, id_coach_fk,id_apprentice_fk) VALUES(?,?,?,?,?,?)`;
            const aprrenticeAdditionalValues = [apprenticeAdditionalInfo.apprenticeAdditionalInfo.trainingGoal,
                apprenticeAdditionalInfo.apprenticeAdditionalInfo.fitnessLevel,
                apprenticeAdditionalInfo.apprenticeAdditionalInfo.weight,
                apprenticeAdditionalInfo.apprenticeAdditionalInfo.height,
                apprenticeAdditionalInfo.apprenticeAdditionalInfo.idCoachFk,
                id
            ];
            const result = yield connection.query(insertAdditionalInfoSQL, aprrenticeAdditionalValues);
            return result[0];
        });
    }
    getApprenticeAdditionalInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `SELECT * FROM  apprentices_additional_info WHERE id_coach = ?;`;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
    updateAdditionalApprenticeAdditionalInfo(apprenticeAdditionalInfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `UPDATE  apprentices_additional_info  SET training_goal= ?, fitness_level=?,  weight=?, height=?  WHERE id_coach_fk =?`;
            const values = [apprenticeAdditionalInfo.apprenticeAdditionalInfo.trainingGoal, apprenticeAdditionalInfo.apprenticeAdditionalInfo.fitnessLevel, apprenticeAdditionalInfo.apprenticeAdditionalInfo.weight, apprenticeAdditionalInfo.apprenticeAdditionalInfo.height, id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
}
exports.AprenticeAdditionalInfoRepository = AprenticeAdditionalInfoRepository;
