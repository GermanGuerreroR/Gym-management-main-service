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
exports.CustomTrainingGoalRepository = void 0;
const data_source_1 = require("./config/data-source");
class CustomTrainingGoalRepository {
    addCustomTrainingGoal(customTrainingGoal, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const customTrainingGoalInfoSQL = `INSERT INTO custom_training_goals (custom_goal_description, id_apprentice_fk) VALUES (?,?)`;
            const customTrainingValues = [
                customTrainingGoal.custromTrainingGoal.customGoalDescription,
                id
            ];
            const result = yield connection.query(customTrainingGoalInfoSQL, customTrainingValues);
            return result[0];
        });
    }
    getCustomTrainingGoals() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `SELECT custom_goal_description FROM custom_training_goals;`;
            const result = yield connection.query(querySQL);
            return result[0];
        });
    }
    getCustomTrainingGoal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `SELECT * FROM custom_training_goals WHERE id_apprentice_fk  = ?;`;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
    updateCustomTrainingGoal(customTrainingGoal, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySql = `UPDATE custom_training_goals SET  custom_goal_description= ? WHERE id_apprentice_fk =?`;
            const values = [customTrainingGoal.custromTrainingGoal.customGoalDescription, id];
            const result = yield connection.query(querySql, values);
            return result[0];
        });
    }
    deleteCustomTrainingGoal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, data_source_1.getPoolConnection)();
            const querySQL = `DELETE FROM custom_training_goa WHERE id_apprentice_fk = ? `;
            const values = [id];
            const result = yield connection.query(querySQL, values);
            return result[0];
        });
    }
}
exports.CustomTrainingGoalRepository = CustomTrainingGoalRepository;
