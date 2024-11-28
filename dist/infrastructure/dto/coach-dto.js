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
exports.CoachDto = void 0;
const class_validator_1 = require("class-validator");
const education_level_1 = require("../../domain/enum/coach-enum/education-level");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
const gender_1 = require("../../domain/enum/apprentice-enum/gender");
class CoachDto {
    constructor(personalInfo, professionalDetailsInfo, certificationInfo, specialityInfo) {
        // Personal Info
        this.name = personalInfo.name;
        this.gender = personalInfo.gender;
        this.dateBirth =
            personalInfo.dateBirth instanceof Date ? personalInfo.dateBirth : new Date(personalInfo.dateBirth);
        this.email = personalInfo.email;
        this.userName = personalInfo.userName;
        this.password = personalInfo.password;
        // Professional Details
        if (professionalDetailsInfo) {
            this.experience = professionalDetailsInfo.experience;
            this.educationLevel = professionalDetailsInfo.educationLevel;
            this.idCoachFk = professionalDetailsInfo.idCoachFk;
        }
        // Certification Info
        if (certificationInfo) {
            this.certificationName = certificationInfo.certificationName;
            this.certificationDate =
                certificationInfo.certificationDate instanceof Date
                    ? certificationInfo.certificationDate
                    : certificationInfo.certificationDate
                        ? new Date(certificationInfo.certificationDate)
                        : undefined;
            this.certifyingEntity = certificationInfo.certifyingEntity;
        }
        // Speciality Info
        if (specialityInfo) {
            this.idCoachSpecialityFk = specialityInfo.idCoachSpeciality;
            this.specialityName = specialityInfo.specialityName;
        }
    }
    validateDto() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, class_validator_1.validate)(this, {
                validationError: { target: false, value: false },
            });
        });
    }
}
exports.CoachDto = CoachDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], CoachDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(gender_1.Gender),
    __metadata("design:type", String)
], CoachDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CoachDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CoachDto.prototype, "dateBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], CoachDto.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], CoachDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CoachDto.prototype, "idCoachFk", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CoachDto.prototype, "experience", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(education_level_1.Educationlevel),
    __metadata("design:type", String)
], CoachDto.prototype, "educationLevel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CoachDto.prototype, "certificationName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CoachDto.prototype, "certificationDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CoachDto.prototype, "certifyingEntity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CoachDto.prototype, "idCoachSpecialityFk", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CoachDto.prototype, "specialityName", void 0);
