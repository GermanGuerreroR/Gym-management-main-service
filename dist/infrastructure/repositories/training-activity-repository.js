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
exports.TrainingActivityClassRepository = void 0;
const data_source_1 = require("./config/data-source");
class TrainingActivityClassRepository {
    addTrainingActivity(trainingActivity) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const insertPersonalInfoSQL = `INSERT INTO training_activities (id_apprentice_fk, id_coach_fk, id_category_fk, duration_minutes,  activity_date) VALUES(?,?,?,?,?)`;
            const personalInfoValues = [trainingActivity.trainingActivityInfo.idApprenticeFk,
                trainingActivity.trainingActivityInfo.idCoachFk,
                trainingActivity.trainingActivityInfo.idCategoryFk,
                trainingActivity.trainingActivityInfo.durationMinutes,
                trainingActivity.trainingActivityInfo.activityDate
            ];
            const result = yield connection.query(insertPersonalInfoSQL, personalInfoValues);
            return result[0];
        });
    }
    updateTrainingActivity(trainingActivity, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const updateSql = `
            UPDATE training_activities
            SET id_apprentice_fk = ?, 
                id_coach_fk = ?, 
                id_category_fk = ?, 
                duration_minutes = ?, 
                activity_date = ?
            WHERE id_activity = ?`;
            const values = [
                trainingActivity.trainingActivityInfo.idApprenticeFk,
                trainingActivity.trainingActivityInfo.idCoachFk,
                trainingActivity.trainingActivityInfo.idCategoryFk,
                trainingActivity.trainingActivityInfo.durationMinutes,
                trainingActivity.trainingActivityInfo.activityDate,
                id
            ];
            const result = yield connection.query(updateSql, values);
            return result[0];
        });
    }
}
exports.TrainingActivityClassRepository = TrainingActivityClassRepository;
