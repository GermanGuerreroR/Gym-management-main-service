
import { TrainingActivityClass } from "../../domain/models/TrainingActivity";
import { TrainingActivityInterface } from "../../domain/interfaces/training-activity";
import { TrainingActivityDTO } from "../../infrastructure/dto/training-activity-dto";
import { TrainingActivityClassRepository } from "../../infrastructure/repositories/training-activity-repository";


export class TrainingActivityController {
    constructor(private repository = new TrainingActivityClassRepository()) { };


    async add(trainingActivityInfo: TrainingActivityInterface) {
        try {
            const DTO = new TrainingActivityDTO(trainingActivityInfo);
            const errors = await DTO.validateDto();
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const trainingActivity = new TrainingActivityClass(trainingActivityInfo);
            const result = await this.repository.addTrainingActivity(trainingActivity);
            return result ? { ok: true, msg: ` Training activity added successfully`, id: `Coach ${result.insertId}` } : { ok: false, message: "Training activity not added " }
        } catch (error: any) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        };
    }


    async update(trainingActivityInfo: TrainingActivityInterface, id: number) {
        try {
            const DTO = new TrainingActivityDTO(trainingActivityInfo);
            const errors = await DTO.validateDto();
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const trainingActivity = new TrainingActivityClass(trainingActivityInfo);
            const result = await this.repository.updateTrainingActivity(trainingActivity, id);
            return result ? { ok: true, msg: ` Training activity updated successfully`, id: `Coach ${result.insertId}` } : { ok: false, message: "Training activity not founded" }
        } catch (error: any) {
            throw { ok: false, message: "An unexpected error has occurred", error };
        };
    }


}