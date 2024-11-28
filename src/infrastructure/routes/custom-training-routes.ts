import express from "express";
import { CustomTrainingGoalController } from "../../application/controllers/custom-training-goal-controller";


export const customTrainingGoalRoutes = () => {
    const router = express.Router();

    const customTrainingGoal = new CustomTrainingGoalController()


    /**
 * @swagger
 * /custom-training-goals:
 *   get:
 *     summary: Obtener todos los objetivos de entrenamiento personalizados
 *     tags:
 *       - CustomTrainingGoals
 *     responses:
 *       200:
 *         description: Lista de objetivos de entrenamiento personalizados obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idCustomTrainingGoal:
 *                     type: integer
 *                     description: Identificador único del objetivo de entrenamiento.
 *                     example: 1
 *                   customGoalDescription:
 *                     type: string
 *                     description: Descripción del objetivo de entrenamiento personalizado.
 *                     example: "Mejorar la resistencia cardiovascular"
 *                   idApprenticeCustomTrainingGoal:
 *                     type: integer
 *                     description: Identificador del aprendiz asociado al objetivo.
 *                     example: 101
 *       404:
 *         description: No se encontraron objetivos de entrenamiento personalizados.
 *       500:
 *         description: Error interno del servidor.
 */


    router.get("/custom-training-goals/", async (req, res) => {
        try {

            const result = await customTrainingGoal.getAll();
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    /**
 * @swagger
 * /custom-training-goals/{id}:
 *   get:
 *     summary: Obtener los detalles de un objetivo de entrenamiento personalizado
 *     tags:
 *       - CustomTrainingGoals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del objetivo de entrenamiento personalizado a obtener.
 *     responses:
 *       200:
 *         description: Detalles del objetivo de entrenamiento personalizado obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idCustomTrainingGoal:
 *                   type: integer
 *                   description: ID único del objetivo de entrenamiento personalizado.
 *                   example: 1
 *                 customGoalDescription:
 *                   type: string
 *                   description: Descripción del objetivo de entrenamiento personalizado.
 *                   example: "Mejorar resistencia cardiovascular"
 *                 idApprenticeCustomTrainingGoal:
 *                   type: integer
 *                   description: ID del aprendiz asociado con el objetivo de entrenamiento.
 *                   example: 101
 *       404:
 *         description: Objetivo de entrenamiento personalizado no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */


    router.get("/custom-training-goals/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const result = await customTrainingGoal.getId(parseInt(id));
            // const status = result.ok === true ? 200 : 404;
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })





    /**
 * @swagger
 * /custom-training-goals/{id}:
 *   put:
 *     summary: Actualizar un objetivo de entrenamiento personalizado
 *     tags:
 *       - CustomTrainingGoals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del objetivo de entrenamiento personalizado que se desea actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customGoalDescription:
 *                 type: string
 *                 description: Descripción del nuevo objetivo de entrenamiento personalizado.
 *               idApprenticeCustomTrainingGoal:
 *                 type: integer
 *                 description: ID del aprendiz al que pertenece el objetivo de entrenamiento.
 *     responses:
 *       200:
 *         description: Objetivo de entrenamiento personalizado actualizado exitosamente.
 *       400:
 *         description: Error al intentar actualizar el objetivo de entrenamiento.
 *       404:
 *         description: No se encontró el objetivo de entrenamiento con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */



    router.put("/custom-training-goals/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const info = req.body;
            const result = await customTrainingGoal.update(info, parseInt(id));
            !result.ok ? res.status(400).send(result) : res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    /**
 * @swagger
 * /custom-training-goals/{id}:
 *   delete:
 *     summary: Eliminar un objetivo de entrenamiento personalizado
 *     tags:
 *       - CustomTrainingGoals
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del objetivo de entrenamiento personalizado que se desea eliminar.
 *     responses:
 *       200:
 *         description: Objetivo de entrenamiento personalizado eliminado exitosamente.
 *       400:
 *         description: Error al intentar eliminar el objetivo de entrenamiento.
 *       404:
 *         description: No se encontró el objetivo de entrenamiento con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */


    router.delete("/custom-training-goals/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const result = await customTrainingGoal.delete(parseInt(id));
            !result.ok ? res.status(400).send(result) : res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })


    return router;
}