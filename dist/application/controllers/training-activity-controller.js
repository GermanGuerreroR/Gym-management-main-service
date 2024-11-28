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
exports.TrainingActivityController = void 0;
const TrainingActivity_1 = require("../../domain/models/TrainingActivity");
const training_activity_dto_1 = require("../../infrastructure/dto/training-activity-dto");
const training_activity_repository_1 = require("../../infrastructure/repositories/training-activity-repository");
class TrainingActivityController {
    constructor(repository = new training_activity_repository_1.TrainingActivityClassRepository()) {
        this.repository = repository;
    }
    ;
    add(trainingActivityInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DTO = new training_activity_dto_1.TrainingActivityDTO(trainingActivityInfo);
                const errors = yield DTO.validateDto();
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const trainingActivity = new TrainingActivity_1.TrainingActivityClass(trainingActivityInfo);
                const result = yield this.repository.addTrainingActivity(trainingActivity);
                return result ? { ok: true, msg: ` Training activity added successfully`, id: `Coach ${result.insertId}` } : { ok: false, message: "Training activity not added " };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
            ;
        });
    }
    update(trainingActivityInfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DTO = new training_activity_dto_1.TrainingActivityDTO(trainingActivityInfo);
                const errors = yield DTO.validateDto();
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const trainingActivity = new TrainingActivity_1.TrainingActivityClass(trainingActivityInfo);
                const result = yield this.repository.updateTrainingActivity(trainingActivity, id);
                return result ? { ok: true, msg: ` Training activity updated successfully`, id: `Coach ${result.insertId}` } : { ok: false, message: "Training activity not founded" };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
            ;
        });
    }
}
exports.TrainingActivityController = TrainingActivityController;
