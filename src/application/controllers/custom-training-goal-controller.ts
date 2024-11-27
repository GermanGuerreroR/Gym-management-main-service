import { CustomTrainigGoalDTO } from "../../infrastructure/dto/custom-training-goal-dto";
import { CustomTrainingGoalClass } from "../../domain/models/CustomTrainingGoal";
import { CustomTrainingGoalInfoInterface } from "../../domain/interfaces/apprenttice-interfaces/custom-training-info";
import { CustomTrainingGoalRepository } from "../../infrastructure/repositories/custom-training-goal-repository";
import { validationID } from "../utils/validationID";

export class CustomTrainingGoalController {
    constructor(private repository = new CustomTrainingGoalRepository()) { };

    async getAll() {
        try {
            const result = await this.repository.getCustomTrainingGoals();
            return result.length === 0 ? { ok: true, message: "There are not custom trainings goals" } : { ok: true, CustomTrainigGoals: result };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async getId(id: number) {
        try {
            if (validationID(id)) return validationID(id);
            const result = await this.repository.getCustomTrainingGoal(id);
            return result.length === 1 ? { ok: true, message: result[0] } : { ok: false, message: "Custom trainings goals not founded" };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }

    async update(custromTrainingGoal: { customGoalDescription: string, idApprenticeCustomTrainingGoal: number }, id: number) {
        try {
            if (validationID(id)) return validationID(id);
            const DTO = new CustomTrainigGoalDTO(custromTrainingGoal);
            const errors = await DTO.validateDto();
            if (errors.length > 0) return { ok: false, message: "The Request has error", error: errors };
            const customTrainingGoal = new CustomTrainingGoalClass(custromTrainingGoal);
            const result = await this.repository.updateCustomTrainingGoal(customTrainingGoal, id);
            return result.affectedRows === 1 ? { ok: true, message: `The custom training goal of the apprentices with the ID ${id} was successfully updated ` } : { ok: false, msg: `Custom training goal not founded` };
        } catch (error) {
            throw { ok: false, message: "An unexpected error has occurred", error }
        }
    }
    async delete(id: number) {
        if (validationID(id)) return validationID(id);
        const result = await this.repository.deleteCustomTrainingGoal(id);
        return result.affectedRows === 1 ? { ok: true, message: "Custom training goal deleted, update your additional info" } : { ok: false, message: " Custom training goal not founded" };
    }
}

