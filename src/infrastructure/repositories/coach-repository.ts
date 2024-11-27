
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { Coach } from "../../domain/models/Coach";
import { getPoolConnection } from "./config/data-source";
import { PersonalInfoClass } from "../../domain/models/PersonalInfo";

export class CoachRepository {
    async addCoach(coach: Coach): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const insertPersonalInfoSQL: string = `INSERT INTO coaches (name, gender, date_birth, email, user_name, password) VALUES(?,?,?,?,?,?)`;
        const personalInfoValues: Array<string | Date> =
            [coach.personalInfo.name,
            coach.personalInfo.gender,
            coach.personalInfo.dateBirth,
            coach.personalInfo.email,
            coach.personalInfo.userName,
            coach.personalInfo.password
            ];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(insertPersonalInfoSQL, personalInfoValues);
        return result[0];
    }

    async getCoaches(): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySQL = `SELECT * FROM coaches`;
        const result = await connection.query<RowDataPacket[]>(querySQL);
        return result[0];
    }

    async getCoach(id: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySQL = `SELECT * FROM coaches WHERE id_coach = ?;`;
        const values = [id];
        const result = await connection.query<RowDataPacket[]>(querySQL, values);
        return result[0];
    }

    async updateCoach(coach: PersonalInfoClass, id: number) {
        const connection = getPoolConnection();
        const querySql = `UPDATE coaches SET name= ?, gender=?, date_birth=?, email=?, user_name=?, password=?  WHERE id_coach =?`;
        const values = [coach.personalInfo.name, coach.personalInfo.gender, coach.personalInfo.dateBirth, coach.personalInfo.email, coach.personalInfo.userName, coach.personalInfo.password, id];
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async deleteCoach(id: number) {
        const connection = getPoolConnection();
        const querySQL = `DELETE FROM coach WHERE id_coach = ? `;
        const values = [id];
        const result = await connection.query<ResultSetHeader>(querySQL, values);
        return result[0];
    }

}

