"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.ApprentinceAdditionalInfoDTO = void 0;
const class_validator_1 = require("class-validator");
require("reflect-metadata");
const fitness_level_1 = require("../../domain/enum/apprentice-enum/fitness-level");
const training_goal_1 = require("../../domain/enum/apprentice-enum/training-goal");
class ApprentinceAdditionalInfoDTO {
    constructor(apprenticeAdditionalInfo) {
        this.apprenticeAdditionalInfo = apprenticeAdditionalInfo;
        this.trainingGoal = apprenticeAdditionalInfo.trainingGoal;
        this.fitnessLevel = apprenticeAdditionalInfo.fitnessLevel;
        this.weight = apprenticeAdditionalInfo.weight;
        this.height = apprenticeAdditionalInfo.height;
        this.idCoachFk = apprenticeAdditionalInfo.idCoachFk;
    }
    validateDto() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, class_validator_1.validate)(this, {
                validationError: { target: false, value: false },
            });
        });
    }
}
exports.ApprentinceAdditionalInfoDTO = ApprentinceAdditionalInfoDTO;
__decorate([
    (0, class_validator_1.IsEnum)(training_goal_1.TrainingGoals),
    __metadata("design:type", String)
], ApprentinceAdditionalInfoDTO.prototype, "trainingGoal", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(fitness_level_1.FitnessLevel),
    __metadata("design:type", String)
], ApprentinceAdditionalInfoDTO.prototype, "fitnessLevel", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(5),
    __metadata("design:type", Number)
], ApprentinceAdditionalInfoDTO.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.50),
    __metadata("design:type", Number)
], ApprentinceAdditionalInfoDTO.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ApprentinceAdditionalInfoDTO.prototype, "idCoachFk", void 0);
