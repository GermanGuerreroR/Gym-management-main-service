export interface TrainingActivityInterface {
    idTrainingActivity?: number;
    idApprenticeFk: number;
    idCoachFk?: number | null;
    idCategoryFk?: number;
    durationMinutes: number;
    activityDate: Date;
}