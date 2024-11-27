import { CertificationInfo } from "../interfaces/coach-interfaces/certification-info";
import { ProfessionalDetailsInfo } from "../interfaces/coach-interfaces/professional-details-info";
import { SpecialityInfo } from "../interfaces/coach-interfaces/speciality-info";
import { PersonalInfo } from "../interfaces/personal-info";

export class Coach {
  constructor(
    public personalInfo: PersonalInfo,
    public coachProfessionalInfo: ProfessionalDetailsInfo,
    public certificationInfo?: CertificationInfo,
    public specialityInfo?: SpecialityInfo
  ) {

  }
}