import express, { Request, Response } from "express";
import { TrainingActivityController } from "../../application/controllers/training-activity-controller";



export const trainingRegisterActivity = () => {
    const router = express.Router();
    const trainingCtrl = new TrainingActivityController();


    /**
 * @swagger
 * /trainings:
 *   post:
 *     summary: Crear un nuevo registro de actividad de entrenamiento
 *     tags:
 *       - Trainings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainingActivityRecord:
 *                 type: object
 *                 properties:
 *                   idTrainingActivity:
 *                     type: integer
 *                     description: Identificador único del registro de actividad de entrenamiento.
 *                     example: 1
 *                   idApprenticeFk:
 *                     type: integer
 *                     description: Identificador del aprendiz asociado al entrenamiento.
 *                     example: 101
 *                   idCoachFk:
 *                     type: integer
 *                     description: Identificador del entrenador responsable del entrenamiento.
 *                     example: 10
 *                   idCategoryFk:
 *                     type: integer
 *                     description: Identificador de la categoría del entrenamiento.
 *                     example: 3
 *                   durationMinutes:
 *                     type: integer
 *                     description: Duración del entrenamiento en minutos.
 *                     example: 60
 *                   activityDate:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora en que se realizó la actividad de entrenamiento.
 *                     example: "2024-11-28"
 *     responses:
 *       200:
 *         description: Registro de actividad de entrenamiento creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Solicitud incorrecta (por ejemplo, faltan campos obligatorios).
 *       500:
 *         description: Error interno del servidor.
 */

    router.post("/trainings", (req, res) => {
        const { trainingActivityRecord } = req.body;
        trainingCtrl.add(trainingActivityRecord).then((result) => {
            result.ok === true ? res.status(200).send(result) : res.status(400).send({ msg: "Bad request" })
        }).catch((error) => {
            res.status(500).send(error)
        })
    })

    /**
 * @swagger
 * /trainings/{id}:
 *   put:
 *     summary: Actualizar un registro de actividad de entrenamiento existente
 *     tags:
 *       - Trainings
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID del registro de actividad de entrenamiento a actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainingActivityRecord:
 *                 type: object
 *                 properties:
 *                   idTrainingActivity:
 *                     type: integer
 *                     description: Identificador único del registro de actividad de entrenamiento.
 *                     example: 1
 *                   idApprenticeFk:
 *                     type: integer
 *                     description: Identificador del aprendiz asociado al entrenamiento.
 *                     example: 101
 *                   idCoachFk:
 *                     type: integer
 *                     description: Identificador del entrenador responsable del entrenamiento.
 *                     example: 10
 *                   idCategoryFk:
 *                     type: integer
 *                     description: Identificador de la categoría del entrenamiento.
 *                     example: 3
 *                   durationMinutes:
 *                     type: integer
 *                     description: Duración del entrenamiento en minutos.
 *                     example: 60
 *                   activityDate:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora en que se realizó la actividad de entrenamiento.
 *                     example: "2024-11-28T10:00:00Z"
 *     responses:
 *       200:
 *         description: Registro de actividad de entrenamiento actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Solicitud incorrecta (por ejemplo, faltan campos obligatorios).
 *       404:
 *         description: No se encontró el registro de actividad de entrenamiento con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */


    router.put("/trainings/:id", (req, res) => {
        const id = Number(req.params.id);
        const { trainingActivityRecord } = req.body;
        trainingCtrl.update(trainingActivityRecord, id).then((result) => {
            result.ok === true ? res.status(200).send(result) : res.status(400).send({ msg: "Bad request" })
        }).catch((error) => {
            res.status(500).send(error)
        })
    })

    return router;
};