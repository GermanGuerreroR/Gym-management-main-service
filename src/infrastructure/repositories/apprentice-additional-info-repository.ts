
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { ApprenticeAdditionalInfo } from "../../domain/models/ApprenticeAdditionalInfo";
import { getPoolConnection } from "./config/data-source";
export class AprenticeAdditionalInfoRepository {
    async addApprenticeAdditionalInfo(apprenticeAdditionalInfo: ApprenticeAdditionalInfo, id: number): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const insertAdditionalInfoSQL: string = `INSERT INTO apprentices_additional_info (training_goal, fitness_level, weight, height, id_coach_fk,id_apprentice_fk) VALUES(?,?,?,?,?,?)`;
        const aprrenticeAdditionalValues: Array<string | number> =
            [apprenticeAdditionalInfo.apprenticeAdditionalInfo.trainingGoal,
            apprenticeAdditionalInfo.apprenticeAdditionalInfo.fitnessLevel,
            apprenticeAdditionalInfo.apprenticeAdditionalInfo.weight,
            apprenticeAdditionalInfo.apprenticeAdditionalInfo.height,
            apprenticeAdditionalInfo.apprenticeAdditionalInfo.idCoachFk,
                id
            ];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(insertAdditionalInfoSQL, aprrenticeAdditionalValues);
        return result[0];
    }

    async getApprenticeAdditionalInfo(id: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySQL = `SELECT * FROM  apprentices_additional_info WHERE id_coach = ?;`;
        const values = [id];
        const result = await connection.query<RowDataPacket[]>(querySQL, values);
        return result[0];
    }

    async updateAdditionalApprenticeAdditionalInfo(apprenticeAdditionalInfo: ApprenticeAdditionalInfo, id: number) {
        const connection = getPoolConnection();
        const querySQL = `UPDATE  apprentices_additional_info  SET training_goal= ?, fitness_level=?,  weight=?, height=?  WHERE id_coach_fk =?`;
        const values = [apprenticeAdditionalInfo.apprenticeAdditionalInfo.trainingGoal, apprenticeAdditionalInfo.apprenticeAdditionalInfo.fitnessLevel, apprenticeAdditionalInfo.apprenticeAdditionalInfo.weight, apprenticeAdditionalInfo.apprenticeAdditionalInfo.height, id];
        const result = await connection.query<ResultSetHeader>(querySQL, values);
        return result[0];
    }

}

