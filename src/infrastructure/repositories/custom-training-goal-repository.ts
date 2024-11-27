

import { FieldPacket, ResultSetHeader, Pool, RowDataPacket } from "mysql2/promise";
import { getPoolConnection } from "./config/data-source";
import { CustomTrainingGoalClass } from "../../domain/models/CustomTrainingGoal";
import { CustomTrainingGoalInfoInterface } from "../../domain/interfaces/apprenttice-interfaces/custom-training-info";

export class CustomTrainingGoalRepository {
  async addCustomTrainingGoal(customTrainingGoal: CustomTrainingGoalClass, id: number): Promise<ResultSetHeader> {
    const connection: Pool = getPoolConnection();
    const customTrainingGoalInfoSQL: string = `INSERT INTO custom_training_goals (custom_goal_description, id_apprentice_fk) VALUES (?,?)`;
    const customTrainingValues: Array<string | number> =
      [
        customTrainingGoal.custromTrainingGoal.customGoalDescription,
        id
      ];
    const result: [ResultSetHeader, FieldPacket[]] = await connection.query(customTrainingGoalInfoSQL, customTrainingValues);
    return result[0];
  }

  async getCustomTrainingGoals(): Promise<RowDataPacket[]> {
    const connection = getPoolConnection();
    const querySQL = `SELECT custom_goal_description FROM custom_training_goals;`;
    const result = await connection.query<RowDataPacket[]>(querySQL);
    return result[0];
  }


  async getCustomTrainingGoal(id: number): Promise<RowDataPacket[]> {
    const connection = getPoolConnection();
    const querySQL = `SELECT * FROM custom_training_goals WHERE id_apprentice_fk  = ?;`;
    const values = [id];
    const result = await connection.query<RowDataPacket[]>(querySQL, values);
    return result[0];
  }

  async updateCustomTrainingGoal(customTrainingGoal: CustomTrainingGoalClass, id: number) {
    const connection = getPoolConnection();
    const querySql = `UPDATE custom_training_goals SET  custom_goal_description= ? WHERE id_apprentice_fk =?`;
    const values = [customTrainingGoal.custromTrainingGoal.customGoalDescription, id];
    const result = await connection.query<ResultSetHeader>(querySql, values);
    return result[0];
  }

  async deleteCustomTrainingGoal(id: number) {
    const connection = getPoolConnection();
    const querySQL = `DELETE FROM custom_training_goa WHERE id_apprentice_fk = ? `;
    const values = [id];
    const result = await connection.query<ResultSetHeader>(querySQL, values);
    return result[0];
  }

}





