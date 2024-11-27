
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data-source";
import { Certification } from "../../domain/models/Certification";
import { CertificationInfo } from "../../domain/interfaces/coach-interfaces/certification-info";

export class CertificationRepository {
    async addCertification(certification: CertificationInfo, id: number): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const insertCertificationInfoSQL: string = `INSERT INTO certifications (certification_name, certification_date,  certifying_entity, id_coach_fk) VALUES (?,?,?,?)`;
        const certificationInfoValues: Array<string | Date | number> =
            [
                certification.certificationName,
                certification.certificationDate,
                certification.certifyingEntity,
                id
            ];
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(insertCertificationInfoSQL, certificationInfoValues);
        return result[0];
    }


    async getCertifications(): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySQL = `SELECT * FROM certifications;`;
        const result = await connection.query<RowDataPacket[]>(querySQL);
        return result[0];
    }

    async getCertification(id: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySQL = `SELECT * FROM certifications WHERE id_coach_fk = ?;`;
        const values = [id];
        const result = await connection.query<RowDataPacket[]>(querySQL, values);
        return result[0];
    }

    async updateCertification(certification: Certification, id: number) {
        const connection = getPoolConnection();
        const querySql = `UPDATE certifications SET certification_name= ?, certification_date=?, certifying_entity=? WHERE id_coach_fk =?`;
        const values = [certification.certificationInfo.certificationName, certification.certificationInfo.certificationDate, certification.certificationInfo.certifyingEntity, id];
        const result = await connection.query<ResultSetHeader>(querySql, values);
        return result[0];
    }

    async deleteCertification(id: number) {
        const connection = getPoolConnection();
        const querySQL = `DELETE FROM certifications WHERE id_coach_fk = ? `;
        const values = [id];
        const result = await connection.query<ResultSetHeader>(querySQL, values);
        return result[0];
    }

}

