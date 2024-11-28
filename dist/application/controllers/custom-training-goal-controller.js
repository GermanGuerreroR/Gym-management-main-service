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
exports.CustomTrainingGoalController = void 0;
const custom_training_goal_dto_1 = require("../../infrastructure/dto/custom-training-goal-dto");
const CustomTrainingGoal_1 = require("../../domain/models/CustomTrainingGoal");
const custom_training_goal_repository_1 = require("../../infrastructure/repositories/custom-training-goal-repository");
const validationID_1 = require("../utils/validationID");
class CustomTrainingGoalController {
    constructor(repository = new custom_training_goal_repository_1.CustomTrainingGoalRepository()) {
        this.repository = repository;
    }
    ;
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.getCustomTrainingGoals();
                return result.length === 0 ? { ok: true, message: "There are not custom trainings goals" } : { ok: true, CustomTrainigGoals: result };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(id))
                    return (0, validationID_1.validationID)(id);
                const result = yield this.repository.getCustomTrainingGoal(id);
                return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "Custom trainings goals not founded" };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    update(custromTrainingGoal, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(id))
                    return (0, validationID_1.validationID)(id);
                const DTO = new custom_training_goal_dto_1.CustomTrainigGoalDTO(custromTrainingGoal);
                const errors = yield DTO.validateDto();
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const customTrainingGoal = new CustomTrainingGoal_1.CustomTrainingGoalClass(custromTrainingGoal);
                const result = yield this.repository.updateCustomTrainingGoal(customTrainingGoal, id);
                return result.affectedRows === 1 ? { ok: true, message: `The custom training goal of the apprentices with the ID ${id} was successfully updated ` } : { ok: false, msg: `Custom training goal not founded` };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, validationID_1.validationID)(id))
                return (0, validationID_1.validationID)(id);
            const result = yield this.repository.deleteCustomTrainingGoal(id);
            return result.affectedRows === 1 ? { ok: true, message: "Custom training goal deleted, update your additional info" } : { ok: false, message: " Custom training goal not founded" };
        });
    }
}
exports.CustomTrainingGoalController = CustomTrainingGoalController;
