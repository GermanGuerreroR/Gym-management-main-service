export interface TrainingActivityInterface {
    idTrainingActivity?: number;
    idApprenticeFk: number;
    idCoachFk: number
    idCategoryFk: number;
    durationMinutes: number;
    activityDate: Date;
}