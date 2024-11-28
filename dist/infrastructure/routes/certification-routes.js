"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.certificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const certification_controller_1 = require("../../application/controllers/certification-controller");
const certificationRoutes = () => {
    const router = express_1.default.Router();
    const certificationCTRL = new certification_controller_1.CertificationController();
    /**
 * @swagger
 * /certifications/{id}:
 *   post:
 *     summary: Agregar certificaciones para un entrenador
 *     description: Permite agregar una nueva certificación a un entrenador utilizando su identificador único (ID).
 *     tags:
 *       - Certifications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El identificador único del entrenador al que se desea agregar la certificación.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       description: Información de la certificación a agregar.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               certificationInfo:
 *                 type: object
 *                 description: Detalles de la certificación del entrenador.
 *                 properties:
 *                   certificationName:
 *                     type: string
 *                     description: Nombre de la certificación.
 *                     example: AWS Certified Solutions Architect
 *                   certificationDate:
 *                     type: string
 *                     format: date
 *                     description: Fecha de obtención de la certificación.
 *                     example: 2023-11-15
 *                   certifyingEntity:
 *                     type: string
 *                     description: Nombre de la entidad que otorgó la certificación.
 *                     example: Amazon Web Services
 *                   idCoachFk:
 *                     type: integer
 *                     description: Identificador único del entrenador asociado.
 *                     example: 10
 *     responses:
 *       200:
 *         description: Certificación agregada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje confirmando la creación de la certificación.
 *                   example: Certification added successfully.
 *       400:
 *         description: Error en la solicitud debido a datos inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
    router.post("/certifications/:id", (req, res) => {
        const idCoach = req.params.id;
        const { certificationInfo } = req.body;
        certificationCTRL
            .add(certificationInfo, parseInt(idCoach))
            .then((result) => {
            if (result.ok)
                res.status(200).send(result);
            if (!result.ok)
                res.status(400).send(result);
            return;
        })
            .catch((error) => {
            res.status(500).send(error);
        });
    });
    /**
 * @swagger
 * /certifications:
 *   get:
 *     summary: Obtener todas las certificaciones
 *     tags:
 *       - Certifications
 *     responses:
 *       200:
 *         description: Lista de certificaciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idCertification:
 *                     type: integer
 *                     description: Identificador único de la certificación.
 *                     example: 10
 *                   certificationName:
 *                     type: string
 *                     description: Nombre de la certificación.
 *                     example: Personal Trainer Certification
 *                   certificationDate:
 *                     type: string
 *                     format: date
 *                     description: Fecha en la que se obtuvo la certificación.
 *                     example: 2024-06-15
 *                   certifyingEntity:
 *                     type: string
 *                     description: Entidad certificadora.
 *                     example: National Academy of Sports Medicine (NASM)
 *                   idCoachFk:
 *                     type: integer
 *                     description: ID del entrenador asociado a la certificación.
 *                     example: 5
 *       500:
 *         description: Error interno del servidor.
 */
    router.get("/certifications", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield certificationCTRL.getAll();
            res.send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    /**
 * @swagger
 * /certifications/{id}:
 *   get:
 *     summary: Obtener una certificación por ID
 *     tags:
 *       - Certifications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la certificación a obtener.
 *     responses:
 *       200:
 *         description: Certificación obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idCertification:
 *                   type: integer
 *                   description: Identificador único de la certificación.
 *                   example: 10
 *                 certificationName:
 *                   type: string
 *                   description: Nombre de la certificación.
 *                   example: Personal Trainer Certification
 *                 certificationDate:
 *                   type: string
 *                   format: date
 *                   description: Fecha en la que se obtuvo la certificación.
 *                   example: 2024-06-15
 *                 certifyingEntity:
 *                   type: string
 *                   description: Entidad certificadora.
 *                   example: National Academy of Sports Medicine (NASM)
 *                 idCoachFk:
 *                   type: integer
 *                   description: ID del entrenador asociado a la certificación.
 *                   example: 5
 *       404:
 *         description: Certificación no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
    router.get("/certifications/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const result = yield certificationCTRL.getId(parseInt(id));
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    /**
 * @swagger
 * /certifications/{id}:
 *   put:
 *     summary: Actualizar una certificación existente
 *     tags:
 *       - Certifications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la certificación a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               certificationName:
 *                 type: string
 *                 description: Nombre de la certificación.
 *                 example: Personal Trainer Certification
 *               certificationDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha en la que se obtuvo la certificación.
 *                 example: 2024-06-15
 *               certifyingEntity:
 *                 type: string
 *                 description: Entidad certificadora.
 *                 example: National Academy of Sports Medicine (NASM)
 *               idCoachFk:
 *                 type: integer
 *                 description: ID del entrenador asociado a la certificación.
 *                 example: 5
 *     responses:
 *       200:
 *         description: Certificación actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Resultado de la operación.
 *                   example: true
 *       400:
 *         description: Error al actualizar la certificación. Datos inválidos o conflicto.
 *       404:
 *         description: Certificación no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
    router.put("/certifications/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { certificationInfo } = req.body;
            const result = yield certificationCTRL.update(certificationInfo, parseInt(id));
            !result.ok ? res.status(400).send(result) : res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    /**
 * @swagger
 * /certifications/{id}:
 *   delete:
 *     summary: Eliminar una certificación existente
 *     tags:
 *       - Certifications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la certificación a eliminar.
 *     responses:
 *       200:
 *         description: Certificación eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Resultado de la operación.
 *                   example: true
 *       404:
 *         description: Certificación no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
    router.delete("/certifications/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const result = yield certificationCTRL;
            res.send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    return router;
};
exports.certificationRoutes = certificationRoutes;
