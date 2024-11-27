
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { TrainingActivityClass } from "../../domain/models/TrainingActivity";
import { getPoolConnection } from "./config/data-source";

export class TrainingActivityClassRepository {
    async addTrainingActivity(trainingActivity: TrainingActivityClass): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const insertPersonalInfoSQL: string = `INSERT INTO training_activities  (id_apprentice_fk, id_coach_fk,  id_category_fk,  duration_minutes,  activity_date) VALUES(?,?,?,?,?)`;
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

  
    async getCoach(id: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySQL = `SELECT * FROM coaches WHERE id_coach = ?;`;
        const values = [id];
        const result = await connection.query<RowDataPacket[]>(querySQL, values);
        return result[0];
    }

    async updateCoach(coach: Coach, id: number) {
        const connection = getPoolConnection();
        const querySql = `UPDATE coaches SET name= ?, gender=?, date_birth=?, email=?, user_name=?, password=?  WHERE id_coach =?`;
        const values = [coach.personalInfo.name, coach.personalInfo.gender, coach.personalInfo.dateBirth, coach.personalInfo.email, coach.personalInfo.userName, coach.personalInfo.password, id];
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

  

}

