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
exports.ApprenticeController = void 0;
const Apprentice_1 = require("../../domain/models/Apprentice");
const apprentice_dto_1 = require("../../infrastructure/dto/apprentice-dto");
const apprentice_repository_1 = require("../../infrastructure/repositories/apprentice-repository");
const validationID_1 = require("../utils/validationID");
const ApprenticeAdditionalInfo_1 = require("../../domain/models/ApprenticeAdditionalInfo");
const apprentice_additional_info_repository_1 = require("../../infrastructure/repositories/apprentice-additional-info-repository");
const coach_repository_1 = require("../../infrastructure/repositories/coach-repository");
const personal_info_dto_1 = require("../../infrastructure/dto/personal-info-dto");
const PersonalInfo_1 = require("../../domain/models/PersonalInfo");
const custom_training_goal_repository_1 = require("../../infrastructure/repositories/custom-training-goal-repository");
const CustomTrainingGoal_1 = require("../../domain/models/CustomTrainingGoal");
class ApprenticeController {
    constructor(repository = new apprentice_repository_1.ApprenticeRepository(), repositoryTwo = new apprentice_additional_info_repository_1.AprenticeAdditionalInfoRepository(), repositoryFour = new coach_repository_1.CoachRepository(), repositoryFive = new custom_training_goal_repository_1.CustomTrainingGoalRepository()) {
        this.repository = repository;
        this.repositoryTwo = repositoryTwo;
        this.repositoryFour = repositoryFour;
        this.repositoryFive = repositoryFive;
    }
    add(personalInfo, apprenticeAdditionalInfo, customTrainingGoalInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = new apprentice_dto_1.ApprenticeDto(personalInfo, apprenticeAdditionalInfo, customTrainingGoalInfo);
                const errors = yield dto.validateDto();
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const apprentice = new Apprentice_1.Apprentice(personalInfo, apprenticeAdditionalInfo, customTrainingGoalInfo);
                const verification = yield this.repositoryFour.getCoach(apprentice.apprenticeInfo.idCoachFk);
                if (verification.length > 0) {
                    const result = yield this.repository.addApprentice(apprentice);
                    const resultTwo = yield this.repositoryTwo.addApprenticeAdditionalInfo(new ApprenticeAdditionalInfo_1.ApprenticeAdditionalInfo(apprenticeAdditionalInfo), result.insertId);
                    if (customTrainingGoalInfo) {
                        const resultThree = yield this.repositoryFive.addCustomTrainingGoal(new CustomTrainingGoal_1.CustomTrainingGoalClass(customTrainingGoalInfo), result.insertId);
                    }
                    if (result && resultTwo)
                        return { ok: true, msg: "Apprentice added successfully", id: `The new apprentice's ID ${result.insertId}` };
                }
                return { ok: false, message: "Error apprentice not added" };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
            ;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.getApprentices();
                if (result.length === 0)
                    return { ok: true, message: "There are no registered apprentices." };
                return { ok: true, Apprentices: result };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    getId(idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(idApprentice))
                    return (0, validationID_1.validationID)(idApprentice);
                const result = yield this.repository.getApprentice(idApprentice);
                if (result.length === 1)
                    return { ok: true, message: result[0] };
                return { ok: false, message: "Apprentice not found." };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    update(personalInfo, idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(idApprentice))
                    return (0, validationID_1.validationID)(idApprentice);
                const dto = new personal_info_dto_1.PersonalInfoDTO(personalInfo);
                const errores = yield dto.validateDto();
                if (errores.length > 0)
                    return { ok: false, message: "The Request has error", error: errores };
                const apprentice = new PersonalInfo_1.PersonalInfoClass(personalInfo);
                const result = yield this.repository.updateApprentice(apprentice, idApprentice);
                if (result.affectedRows === 1)
                    return { ok: true, message: `The apprentice with ID ${idApprentice} was successfully updated` };
                return { ok: false, message: `The apprentice with ID ${idApprentice} was not found` };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    delete(idApprentice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(idApprentice))
                    return (0, validationID_1.validationID)(idApprentice);
                const result = yield this.repository.deleteApprentice(idApprentice);
                if (result.affectedRows === 1)
                    return { ok: true, message: `Apprentice with ID${result.insertId} has been deleted succesfully` };
                return { ok: false, message: `Apprentice with ID ${idApprentice} not found.` };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
}
exports.ApprenticeController = ApprenticeController;
