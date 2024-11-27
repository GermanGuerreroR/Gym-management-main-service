
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data-source";
import { Speciality } from "../../domain/models/Speciality";


export class SpecialityRepository {
    async addSpeciality(speciality: Speciality, id: number): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const inserSpecialityInfoSQL: string = `INSERT INTO specialities ( specialty_name, id_coach_fk) VALUES(?,?)`;
        const specialityInfoValues: Array<string | Date | number> =
            [speciality.specialityInfo.specialityName, id];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(inserSpecialityInfoSQL, specialityInfoValues);
        return result[0];
    }


    async getSpecialities(): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySQL = `SELECT * FROM specialities;`;
        const result = await connection.query<RowDataPacket[]>(querySQL);
        return result[0];
    }

    async getSpeciality(id: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySQL = `SELECT * FROM specialities WHERE id_coach_fk = ?;`;
        const values = [id];
        const result = await connection.query<RowDataPacket[]>(querySQL, values);
        return result[0];
    }

    async updateSpeciality(speciality: Speciality, id: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySQL = `UPDATE specialities SET specialty_name= ?  WHERE id_coach_fk =?`;
        const values = [speciality.specialityInfo.specialityName, id];
        const result = await connection.query<ResultSetHeader>(querySQL, values);
        return result[0];
    }

    async deleteSpeciality(id: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySQL = `DELETE FROM speciality WHERE id_coach_fk = ? `;
        const values = [id];
        const result = await connection.query<ResultSetHeader>(querySQL, values);
        return result[0];
    }

}

