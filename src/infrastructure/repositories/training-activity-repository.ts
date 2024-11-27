
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { TrainingActivityClass } from "../../domain/models/TrainingActivity";
import { getPoolConnection } from "./config/data-source";

export class TrainingActivityClassRepository {
    async addTrainingActivity(trainingActivity: TrainingActivityClass): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const insertPersonalInfoSQL: string = `INSERT INTO training_activities (id_apprentice_fk, id_coach_fk, id_category_fk, duration_minutes,  activity_date) VALUES(?,?,?,?,?)`;
        const personalInfoValues: Array<any> =
            [trainingActivity.trainingActivityInfo.idApprenticeFk,
            trainingActivity.trainingActivityInfo.idCoachFk,
            trainingActivity.trainingActivityInfo.idCategoryFk,
            trainingActivity.trainingActivityInfo.durationMinutes,
            trainingActivity.trainingActivityInfo.activityDate
            ];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(insertPersonalInfoSQL, personalInfoValues);
        return result[0];
    }


    

    async updateTrainingActivity(trainingActivity: TrainingActivityClass, id: number): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const updateSql: string = `
            UPDATE training_activities
            SET id_apprentice_fk = ?, 
                id_coach_fk = ?, 
                id_category_fk = ?, 
                duration_minutes = ?, 
                activity_date = ?
            WHERE id_activity = ?`;
        const values: Array<any> = [
            trainingActivity.trainingActivityInfo.idApprenticeFk,
            trainingActivity.trainingActivityInfo.idCoachFk,
            trainingActivity.trainingActivityInfo.idCategoryFk,
            trainingActivity.trainingActivityInfo.durationMinutes,
            trainingActivity.trainingActivityInfo.activityDate,
            id
        ];

        const result = await connection.query<ResultSetHeader>(updateSql, values);
        return result[0];
    }



}

