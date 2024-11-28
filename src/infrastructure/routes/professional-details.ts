import express from "express";
import { ProfessionalDetailsController } from "../../application/controllers/professional-details-controller";


export const professionlDetailsRoutes = () => {
    const router = express.Router();

    const professionalDetails = new ProfessionalDetailsController();

    /**
 * @swagger
 * /professional-details/{id}:
 *   get:
 *     summary: Obtener los detalles profesionales de un usuario por ID
 *     description: Recupera los detalles profesionales de un usuario específico utilizando su identificador único (ID).
 *     tags:
 *       - Professional Details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El identificador único del usuario cuyos detalles profesionales se desean obtener.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles profesionales recuperados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Identificador único de los detalles profesionales.
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: Título profesional del usuario.
 *                   example: Full Stack Developer
 *                 experienceYears:
 *                   type: integer
 *                   description: Años de experiencia profesional.
 *                   example: 5
 *                 certifications:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Certificaciones profesionales obtenidas.
 *                   example: ["AWS Certified Solutions Architect", "Scrum Master"]
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Habilidades principales del usuario.
 *                   example: ["JavaScript", "TypeScript", "Node.js"]
 *       404:
 *         description: No se encontraron detalles profesionales para el ID especificado.
 *       500:
 *         description: Error interno del servidor.
 */


    router.get("/professional-details/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const result = await professionalDetails.getId(parseInt(id));
            // const status = result.ok === true ? 200 : 404;
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    /**
 * @swagger
 * /professional-details/{id}:
 *   put:
 *     summary: Actualizar detalles profesionales de un entrenador por ID
 *     description: Actualiza la experiencia y el nivel educativo de un entrenador específico utilizando su identificador único (ID).
 *     tags:
 *       - Professional Details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El identificador único del entrenador cuyos detalles profesionales se desean actualizar.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       description: Información profesional a actualizar.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               certificationInfo:
 *                 type: object
 *                 description: Detalles profesionales del entrenador.
 *                 properties:
 *                   experience:
 *                     type: integer
 *                     description: Años de experiencia del entrenador.
 *                     example: 5
 *                   educationLevel:
 *                     type: string
 *                     description: Nivel educativo alcanzado por el entrenador.
 *                     example: Bachelor
 *                   idCoachFk:
 *                     type: integer
 *                     description: Identificador único del entrenador relacionado.
 *                     example: 10
 *     responses:
 *       200:
 *         description: Detalles profesionales actualizados exitosamente.
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
 *                   description: Mensaje confirmando la actualización.
 *                   example: Professional details updated successfully.
 *       400:
 *         description: La solicitud no pudo ser procesada debido a errores en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */

    router.put("/professional-details/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const { certificationInfo } = req.body;
            const result = await professionalDetails.update(certificationInfo, parseInt(id));
            !result.ok ? res.status(400).send(result) : res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    return router;
}