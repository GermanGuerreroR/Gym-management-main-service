import express from "express";
import { ApprenticeController } from "../../application/controllers/apprentice-controller";

export const apprenticeRoutes = () => {
    const router = express.Router();
    const apprenticeCtrl = new ApprenticeController();



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
* /coaches:
*   post:
*     summary: Create coach
*     description: Ruta para crear un entrenador.
*     tags:
*       - Coach
*     requestBody:
*       description: Información necesaria para crear un entrenador.
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nombre:
*                 type: string
*                 description: Nombre completo del entrenador.
*                 example: Juan Pérez
*               correo:
*                 type: string
*                 description: Correo electrónico del entrenador.
*                 example: juan.perez@example.com
*               telefono:
*                 type: string
*                 description: Número de teléfono del entrenador.
*                 example: "+57 300 123 4567"
*               especialidades:
*                 type: array
*                 description: Lista de especialidades del entrenador.
*                 items:
*                   type: string
*                 example: ["Yoga", "Crossfit"]
*     responses:
*       200:
*         description: Entrenador creado exitosamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   description: Identificador único del entrenador.
*                   example: 1
*                 nombre:
*                   type: string
*                   description: Nombre completo del entrenador.
*                   example: Juan Pérez
*                 correo:
*                   type: string
*                   description: Correo electrónico del entrenador.
*                   example: juan.perez@example.com
*                 telefono:
*                   type: string
*                   description: Número de teléfono del entrenador.
*                   example: "+57 300 123 4567"
*                 especialidades:
*                   type: array
*                   description: Lista de especialidades del entrenador.
*                   items:
*                     type: string
*                   example: ["Yoga", "Crossfit"]
*       400:
*         description: Error de validación. Verifique los datos enviados.
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
