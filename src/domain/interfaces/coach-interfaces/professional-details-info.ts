import { Educationlevel } from "../../enum/coach-enum/education-level";

export interface ProfessionalDetailsInfo {
    idCoachProfessionalDetails?: number;
    experience: number;
    educationLevel: Educationlevel;
    idCoachFk: number;
}