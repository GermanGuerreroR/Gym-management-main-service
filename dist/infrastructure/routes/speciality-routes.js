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
exports.specialitiesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const speciality_controller_1 = require("../../application/controllers/speciality-controller");
const specialitiesRoutes = () => {
    const router = express_1.default.Router();
    const certificationCTRL = new speciality_controller_1.SpecialityController();
    /**
  * @swagger
  * /specialities/{id}:
  *   post:
  *     summary: Crea una nueva especialidad para un entrenador específico.
  *     description: Agrega una nueva especialidad para un entrenador, tomando el `idCoach` desde los parámetros de la URL.
  *     tags:
  *       - Especialidades
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID del entrenador (coach) al que se le asignará la especialidad.
  *         schema:
  *           type: integer
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               specialityInfo:
  *                 type: object
  *                 properties:
  *                   specialityName:
  *                     type: string
  *                     description: Nombre de la especialidad.
  *                     example: "Karate Supremo"
  *             required:
  *               - specialityInfo
  *               - specialityName
  *     responses:
  *       200:
  *         description: Especialidad creada con éxito.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 ok:
  *                   type: boolean
  *                   example: true
  *                 message:
  *                   type: string
  *                   example: "Especialidad creada exitosamente"
  *       400:
  *         description: Solicitud incorrecta (por ejemplo, falta el nombre de la especialidad).
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 ok:
  *                   type: boolean
  *                   example: false
  *                 message:
  *                   type: string
  *                   example: "Bad request"
  *       500:
  *         description: Error en el servidor.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 ok:
  *                   type: boolean
  *                   example: false
  *                 message:
  *                   type: string
  *                   example: "Internal server error"
  */
    router.post("/specialities/:id", (req, res) => {
        const { specialityInfo } = req.body;
        const idCoach = req.params.id;
        certificationCTRL
            .add(specialityInfo, Number(idCoach))
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
     * /specialities:
     *   get:
     *     summary: Recupera todas las especialidades.
     *     description: Obtiene una lista de todas las especialidades disponibles en el sistema.
     *     tags:
     *       - Especialidades
     *     responses:
     *       200:
     *         description: Lista de especialidades recuperada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   idSpeciality:
     *                     type: integer
     *                     description: ID único de la especialidad.
     *                   specialityName:
     *                     type: string
     *                     description: Nombre de la especialidad.
     *                   idCoachFk:
     *                     type: integer
     *                     description: ID del entrenador asociado con la especialidad.
     *       500:
     *         description: Error en el servidor al intentar recuperar las especialidades.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Internal server error"
     */
    router.get("/specialities", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
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
     * /specialities/{id}:
     *   get:
     *     summary: Obtiene una especialidad específica de un entrenador.
     *     description: Recupera la especialidad de un entrenador dado su `idCoach` (ID del entrenador) en la URL.
     *     tags:
     *       - Especialidades
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID del entrenador (coach) cuya especialidad se desea obtener.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Especialidad encontrada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: true
     *                 specialityInfo:
     *                   type: object
     *                   properties:
     *                     specialityName:
     *                       type: string
     *                       description: Nombre de la especialidad del entrenador.
     *                       example: "Karate Supremo"
     *       404:
     *         description: Especialidad no encontrada o ID no válido.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Especialidad no encontrada"
     *       500:
     *         description: Error en el servidor.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Internal server error"
     */
    router.get("/specialities/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
     * /specialities/{id}:
     *   put:
     *     summary: Actualiza una especialidad de un entrenador específico.
     *     description: Actualiza los detalles de la especialidad de un entrenador dado su `idCoach` (ID del entrenador) en la URL.
     *     tags:
     *       - Especialidades
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID del entrenador (coach) cuya especialidad se va a actualizar.
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               specialityInfo:
     *                 type: object
     *                 properties:
     *                   specialityName:
     *                     type: string
     *                     description: Nombre de la especialidad a actualizar.
     *                     example: "Karate Supremo"
     *             required:
     *               - specialityInfo
     *               - specialityName
     *     responses:
     *       200:
     *         description: Especialidad actualizada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Especialidad actualizada exitosamente"
     *       400:
     *         description: Solicitud incorrecta (por ejemplo, falta el nombre de la especialidad o formato inválido).
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Bad request"
     *       500:
     *         description: Error en el servidor.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Internal server error"
     */
    router.put("/specialities/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
     * /specialities/{id}:
     *   delete:
     *     summary: Elimina una especialidad de un entrenador.
     *     description: Elimina la especialidad de un entrenador dado su `idCoach` (ID del entrenador) en la URL.
     *     tags:
     *       - Especialidades
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID del entrenador cuya especialidad se desea eliminar.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Especialidad eliminada con éxito.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Especialidad eliminada con éxito"
     *       404:
     *         description: Especialidad no encontrada o ID no válido.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Especialidad no encontrada"
     *       500:
     *         description: Error en el servidor.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 ok:
     *                   type: boolean
     *                   example: false
     *                 message:
     *                   type: string
     *                   example: "Internal server error"
     */
    router.delete("/specialities/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.specialitiesRoutes = specialitiesRoutes;
