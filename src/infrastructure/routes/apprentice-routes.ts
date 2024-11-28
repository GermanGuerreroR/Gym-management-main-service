import express from "express";
import { ApprenticeController } from "../../application/controllers/apprentice-controller";

export const apprenticeRoutes = () => {
    const router = express.Router();
    const apprenticeCtrl = new ApprenticeController();

    /**
     * @swagger
     * /apprentices:
     *   post:
     *     summary: Añadir un nuevo aprendiz
     *     description: Añade un nuevo aprendiz al sistema de gestión del gimnasio.
     *     tags:
     *       - Apprentice
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               personalInfo:
     *                 type: object
     *                 properties:
     *                   name:
     *                     type: string
     *                     description: Nombre completo del aprendiz.
     *                     example: John Doe
     *                   gender:
     *                     type: string
     *                     enum: ["Male", "Female"]
     *                     description: Género del aprendiz.
     *                     example: Male
     *                   dateBirth:
     *                     type: string
     *                     format: date
     *                     description: Fecha de nacimiento del aprendiz.
     *                     example: 1990-05-25
     *                   email:
     *                     type: string
     *                     description: Correo electrónico del aprendiz.
     *                     example: john.doe@example.com
     *                   userName:
     *                     type: string
     *                     description: Nombre de usuario del aprendiz.
     *                     example: johndoe
     *                   password:
     *                     type: string
     *                     description: Contraseña del aprendiz.
     *                     example: securepassword123
     *               apprenticeAdditionalInfo:
     *                 type: object
     *                 properties:
     *                   trainingGoal:
     *                     type: string
     *                     enum: ["Weight Loss", "Muscle Gain", "Maintenance"]
     *                     description: Objetivo de entrenamiento del aprendiz.
     *                     example: Muscle Gain
     *                   fitnessLevel:
     *                     type: string
     *                     enum: ["Beginner", "Intermediate", "Advanced"]
     *                     description: Nivel de acondicionamiento físico del aprendiz.
     *                     example: Intermediate
     *                   weight:
     *                     type: number
     *                     description: Peso del aprendiz.
     *                     example: 75
     *                   height:
     *                     type: number
     *                     description: Altura del aprendiz.
     *                     example: 1.80
     *                   idCoachFk:
     *                     type: integer
     *                     description: Identificador del entrenador asignado al aprendiz.
     *                     example: 5
     *               customTrainingGoalInfo:
     *                 type: object
     *                 properties:
     *                   goalName:
     *                     type: string
     *                     description: Nombre del objetivo de entrenamiento personalizado.
     *                     example: Strength Training
     *                   description:
     *                     type: string
     *                     description: Descripción del objetivo de entrenamiento personalizado.
     *                     example: Focus on increasing strength in core muscles.
     *     responses:
     *       200:
     *         description: Aprendiz añadido exitosamente.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: Apprentice added successfully
     *                 apprenticeId:
     *                   type: integer
     *                   example: 123
     *       400:
     *         description: Datos inválidos proporcionados.
     *       500:
     *         description: Error interno del servidor.
     */


    router.post("/apprentices", (req, res) => {
        const { personalInfo, apprenticeAdditionalInfo, customTrainingGoalInfo } = req.body;
        apprenticeCtrl
            .add(personalInfo, apprenticeAdditionalInfo, customTrainingGoalInfo)
            .then((result) => {
                const status = result?.ok === true ? 200 : 400;
                res.status(status).send(result);
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    /**
 * @swagger
 * /apprentices:
 *   get:
 *     summary: Obtener todos los aprendices
 *     description: Obtiene una lista de todos los aprendices registrados en el sistema de gestión del gimnasio.
 *     tags:
 *       - Apprentice
 *     responses:
 *       200:
 *         description: Lista de aprendices obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Identificador único del aprendiz.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Nombre completo del aprendiz.
 *                     example: John Doe
 *                   gender:
 *                     type: string
 *                     description: Género del aprendiz.
 *                     example: Male
 *                   dateBirth:
 *                     type: string
 *                     format: date
 *                     description: Fecha de nacimiento del aprendiz.
 *                     example: 1990-05-25
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del aprendiz.
 *                     example: john.doe@example.com
 *                   userName:
 *                     type: string
 *                     description: Nombre de usuario del aprendiz.
 *                     example: johndoe
 *                   weight:
 *                     type: number
 *                     description: Peso del aprendiz.
 *                     example: 75
 *                   height:
 *                     type: number
 *                     description: Altura del aprendiz.
 *                     example: 1.80
 *                   trainingGoal:
 *                     type: string
 *                     enum: ["Weight Loss", "Muscle Gain", "Maintenance"]
 *                     description: Objetivo de entrenamiento del aprendiz.
 *                     example: Muscle Gain
 *                   fitnessLevel:
 *                     type: string
 *                     enum: ["Beginner", "Intermediate", "Advanced"]
 *                     description: Nivel de acondicionamiento físico del aprendiz.
 *                     example: Intermediate
 *       500:
 *         description: Error interno del servidor.
 */

    router.get("/apprentices", async (_, res) => {
        try {
            const result = await apprenticeCtrl.getAll();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    /**
 * @swagger
 * /apprentices/{id}:
 *   get:
 *     summary: Obtener un aprendiz por ID
 *     description: Obtiene los detalles de un aprendiz específico utilizando su identificador único (ID).
 *     tags:
 *       - Apprentice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El identificador único del aprendiz.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del aprendiz obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único del aprendiz.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Nombre completo del aprendiz.
 *                   example: John Doe
 *                 gender:
 *                   type: string
 *                   description: Género del aprendiz.
 *                   example: Male
 *                 dateBirth:
 *                   type: string
 *                   format: date
 *                   description: Fecha de nacimiento del aprendiz.
 *                   example: 1990-05-25
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del aprendiz.
 *                   example: john.doe@example.com
 *                 userName:
 *                   type: string
 *                   description: Nombre de usuario del aprendiz.
 *                   example: johndoe
 *                 weight:
 *                   type: number
 *                   description: Peso del aprendiz.
 *                   example: 75
 *                 height:
 *                   type: number
 *                   description: Altura del aprendiz.
 *                   example: 1.80
 *                 trainingGoal:
 *                   type: string
 *                   enum: ["Weight Loss", "Muscle Gain", "Maintenance"]
 *                   description: Objetivo de entrenamiento del aprendiz.
 *                   example: Muscle Gain
 *                 fitnessLevel:
 *                   type: string
 *                   enum: ["Beginner", "Intermediate", "Advanced"]
 *                   description: Nivel de acondicionamiento físico del aprendiz.
 *                   example: Intermediate
 *       404:
 *         description: El aprendiz con el ID especificado no fue encontrado.
 *       500:
 *         description: Error interno del servidor.
 */


    router.get("/apprentices/:id", async (req, res) => {
        try {
            const idApprentice = req.params.id;
            const result = await apprenticeCtrl.getId(parseInt(idApprentice));
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    /**
 * @swagger
 * /apprentices/{id}:
 *   put:
 *     summary: Actualizar la información personal de un aprendiz
 *     description: Actualiza los datos personales de un aprendiz específico utilizando su identificador único (ID).
 *     tags:
 *       - Apprentice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El identificador único del aprendiz.
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
 *               personalInfo:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Nombre completo del aprendiz.
 *                     example: John Doe
 *                   gender:
 *                     type: string
 *                     description: Género del aprendiz.
 *                     example: Male
 *                   dateBirth:
 *                     type: string
 *                     format: date
 *                     description: Fecha de nacimiento del aprendiz.
 *                     example: 1990-05-25
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del aprendiz.
 *                     example: john.doe@example.com
 *                   userName:
 *                     type: string
 *                     description: Nombre de usuario del aprendiz.
 *                     example: johndoe
 *                   password:
 *                     type: string
 *                     description: Contraseña del aprendiz.
 *                     example: 12345
 *     responses:
 *       200:
 *         description: Información personal del aprendiz actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la actualización fue exitosa.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje sobre el resultado de la operación.
 *                   example: Apprentice updated successfully.
 *       400:
 *         description: Error de validación o fallo en la actualización.
 *       500:
 *         description: Error interno del servidor.
 */


    router.put("/apprentices/:id", async (req, res) => {
        try {
            const idApprentice = req.params.id;
            console.log(idApprentice);
            const { personalInfo } = req.body;
            const result = await apprenticeCtrl.update(personalInfo, parseInt(idApprentice));
            !result.ok ? res.status(400).send(result) : res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })


    /**
 * @swagger
 * /apprentices/{id}:
 *   delete:
 *     summary: Eliminar un aprendiz por ID
 *     description: Elimina un aprendiz específico utilizando su identificador único (ID).
 *     tags:
 *       - Apprentice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El identificador único del aprendiz que se desea eliminar.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: El aprendiz fue eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la eliminación fue exitosa.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje confirmando la eliminación.
 *                   example: Apprentice deleted successfully.
 *       404:
 *         description: El aprendiz con el ID especificado no fue encontrado.
 *       500:
 *         description: Error interno del servidor.
 */


    router.delete("/apprentices/:id", async (req, res) => {
        try {
            const idApprentice = req.params.id;
            const result = await apprenticeCtrl.delete(parseInt(idApprentice));
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })



    return router;
}
