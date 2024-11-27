
import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data-source";
import { ProfessionalDetails } from "../../domain/models/ProfessionalDetails";
import { ProfessionalDetailsInfo } from "../../domain/interfaces/coach-interfaces/professional-details-info";

export class ProfessionalDetailsRepository {


    async addProfessionalDetailsInfo(professionalDetails: ProfessionalDetails, id: number): Promise<ResultSetHeader> {
        const connection: Pool = getPoolConnection();
        const insertProfessionalDetailsInfoSQL: string = `INSERT INTO coaches_professional_details ( experience ,education_level,id_coach_fk) VALUES(?,?,?)`;
        const professionalInfoValues: Array<string | number> = [professionalDetails.professionalDetails.experience, professionalDetails.professionalDetails.educationLevel, id]
        const result: [ResultSetHeader, FieldPacket[]] = await connection.query(insertProfessionalDetailsInfoSQL, professionalInfoValues);
        return result[0];
    }


    async getProfessionalDetail(id: number): Promise<RowDataPacket[]> {
        const connection = getPoolConnection();
        const querySQL = `SELECT * FROM coaches_professional_details WHERE id_coach_fk=?`;
        const values = [id]
        const result = await connection.query<RowDataPacket[]>(querySQL, values);
        return result[0];
    }


    async updateCoachProfessionalDetails(professionalDetails: ProfessionalDetails, id: number): Promise<ResultSetHeader> {
        const connection = getPoolConnection();
        const querySQL = `UPDATE coaches_professional_details SET  experience=?, education_level=?  WHERE id_coach_fk =?`;
        const values = [professionalDetails.professionalDetails.experience, professionalDetails.professionalDetails.educationLevel, id];
        const result = await connection.query<ResultSetHeader>(querySQL, values);
        return result[0];
    }

}

