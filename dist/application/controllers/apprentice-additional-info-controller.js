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
exports.ApprenticeAdittionalInfoController = void 0;
const ApprenticeAdditionalInfo_1 = require("../../domain/models/ApprenticeAdditionalInfo");
const apprentice_additiona_info_dto_1 = require("../../infrastructure/dto/apprentice-additiona-info-dto");
const validationID_1 = require("../utils/validationID");
const apprentice_additional_info_repository_1 = require("../../infrastructure/repositories/apprentice-additional-info-repository");
class ApprenticeAdittionalInfoController {
    constructor(repository = new apprentice_additional_info_repository_1.AprenticeAdditionalInfoRepository()) {
        this.repository = repository;
    }
    ;
    add(apprenticeAdditionalInfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DTO = new apprentice_additiona_info_dto_1.ApprentinceAdditionalInfoDTO(apprenticeAdditionalInfo);
                const errors = yield DTO.validateDto();
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const additionalInfo = new ApprenticeAdditionalInfo_1.ApprenticeAdditionalInfo(apprenticeAdditionalInfo);
                const result = yield this.repository.addApprenticeAdditionalInfo(additionalInfo, id);
                return result;
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
            ;
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, validationID_1.validationID)(id))
                    return (0, validationID_1.validationID)(id);
                const result = yield this.repository.getApprenticeAdditionalInfo(id);
                return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "Additional info not founded." };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
    update(apprenticeAdditionalInfo, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DTO = new apprentice_additiona_info_dto_1.ApprentinceAdditionalInfoDTO(apprenticeAdditionalInfo);
                const errors = yield DTO.validateDto();
                if ((0, validationID_1.validationID)(id))
                    return (0, validationID_1.validationID)(id);
                if (errors.length > 0)
                    return { ok: false, message: "The Request has error", error: errors };
                const additionalInfo = new ApprenticeAdditionalInfo_1.ApprenticeAdditionalInfo(apprenticeAdditionalInfo);
                const result = yield this.repository.updateAdditionalApprenticeAdditionalInfo(additionalInfo, id);
                return result.affectedRows === 1 ? { ok: true, message: `The apprentices information with ID ${id} was successfully updated ` } : { ok: false, msg: `The apprentices additional info with the ID ${id} was not founded` };
            }
            catch (error) {
                throw { ok: false, message: "An unexpected error has occurred", error };
            }
        });
    }
}
exports.ApprenticeAdittionalInfoController = ApprenticeAdittionalInfoController;
