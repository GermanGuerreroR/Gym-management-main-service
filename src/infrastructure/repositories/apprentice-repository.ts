import { Apprentice } from "../../domain/models/Apprentice";
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data-source";
import { PersonalInfoClass } from "../../domain/models/PersonalInfo";




export class ApprenticeRepository {
    getConnection: any;
    async addApprentice(apprentice: Apprentice): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const insertPersonalApprenticeInfoSQL = 'INSERT INTO apprentices (name, gender, date_birth, email, user_name, password ) VALUES(?, ?, ?, ?, ?, ?)';
        const values = [apprentice.personalInfo.name, apprentice.personalInfo.gender, apprentice.personalInfo.dateBirth, apprentice.personalInfo.email, apprentice.personalInfo.userName, apprentice.personalInfo.password]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(insertPersonalApprenticeInfoSQL, values);
        return result[0];
    }

    async getApprentices(): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM apprentices`;
        const result = await connection.query<RowDataPacket[]>(querySql);
        return result[0];
    }

    async getApprentice(idApprentice: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySql = `SELECT * FROM apprentices WHERE id_apprentice = ?`
        const values = [idApprentice];
        const result = await connection.query<RowDataPacket[]>(querySql, values);
        return result[0];
    }

    async updateApprentice(apprentice: PersonalInfoClass, idApprentice: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = `UPDATE apprentices SET name = ?, gender = ?, date_birth = ?, email=?, user_name=?, password = ?  WHERE id_apprentice = ?`
        const values: Array<string | number | Date | undefined> = [
            apprentice.personalInfo.name,
            apprentice.personalInfo.gender,
            apprentice.personalInfo.dateBirth,
            apprentice.personalInfo.email,
            apprentice.personalInfo.userName,
            apprentice.personalInfo.password, idApprentice]
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async deleteApprentice(idApprentice: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySql = ` DELETE FROM apprentices WHERE id_apprentice = ?`;
        const values = [idApprentice]
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }
}