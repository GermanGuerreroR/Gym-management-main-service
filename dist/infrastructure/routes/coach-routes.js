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
exports.coachRoutes = void 0;
const express_1 = __importDefault(require("express"));
const coach_controller_1 = require("../../application/controllers/coach-controller");
const coachRoutes = () => {
    const router = express_1.default.Router();
    const coachCtrl = new coach_controller_1.CoachController();
    /**
   * @swagger
   * /coaches:
   *   post:
   *     summary: Crear entrenador
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
   *               personalInfo:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *                     description: Nombre completo del entrenador.
   *                     example: Hans Müller Schmidt
   *                   gender:
   *                     type: string
   *                     description: Género del entrenador.
   *                     example: Männlich
   *                   dateBirth:
   *                     type: string
   *                     format: date
   *                     description: Fecha de nacimiento del entrenador.
   *                     example: "1985-07-15"
   *                   email:
   *                     type: string
   *                     description: Correo electrónico del entrenador.
   *                     example: hansmueller@example.com
   *                   userName:
   *                     type: string
   *                     description: Nombre de usuario del entrenador.
   *                     example: hans.m
   *                   password:
   *                     type: string
   *                     description: Contraseña del entrenador.
   *                     example: S!ch3rH@ns2024#
   *               professionalDetailsInfo:
   *                 type: object
   *                 properties:
   *                   experience:
   *                     type: integer
   *                     description: Años de experiencia del entrenador.
   *                     example: 7
   *                   educationLevel:
   *                     type: string
   *                     description: Nivel educativo del entrenador.
   *                     example: University
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
   *                 personalInfo:
   *                   type: object
   *                   properties:
   *                     name:
   *                       type: string
   *                       description: Nombre completo del entrenador.
   *                       example: Hans Müller Schmidt
   *                     gender:
   *                       type: string
   *                       description: Género del entrenador.
   *                       example: Männlich
   *                     dateBirth:
   *                       type: string
   *                       format: date
   *                       description: Fecha de nacimiento del entrenador.
   *                       example: "1985-07-15"
   *                     email:
   *                       type: string
   *                       description: Correo electrónico del entrenador.
   *                       example: hansmueller@example.com
   *                     userName:
   *                       type: string
   *                       description: Nombre de usuario del entrenador.
   *                       example: hans.m
   *                 professionalDetailsInfo:
   *                   type: object
   *                   properties:
   *                     experience:
   *                       type: integer
   *                       description: Años de experiencia del entrenador.
   *                       example: 7
   *                     educationLevel:
   *                       type: string
   *                       description: Nivel educativo del entrenador.
   *                       example: Praktikant
   *       400:
   *         description: Error de validación. Verifique los datos enviados.
   *       500:
   *         description: Error interno del servidor.
   */
    router.post("/coaches", (req, res) => {
        const { personalInfo, professionalDetailsInfo, certificationInfo, specialityInfo } = req.body;
        coachCtrl
            .add(personalInfo, professionalDetailsInfo, certificationInfo, specialityInfo)
            .then((result) => {
            if (result.ok)
                res.status(200).send(result);
            if (result.ok === false)
                res.status(400).send(result);
            return;
        })
            .catch((error) => {
            res.status(500).send(error);
        });
    });
    /**
    * @swagger
    * /coaches:
    *   get:
    *     summary: Obtener todos los entrenadores
    *     description: Obtiene una lista de todos los entrenadores.
    *     tags:
    *       - Coach
    *     responses:
    *       200:
    *         description: Lista de entrenadores obtenida exitosamente.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 type: object
    *                 properties:
    *                   id:
    *                     type: integer
    *                     description: Identificador único del entrenador.
    *                     example: 1
    *                   name:
    *                     type: string
    *                     description: Nombre completo del entrenador.
    *                     example: Hans Müller Schmidt
    *                   gender:
    *                     type: string
    *                     description: Género del entrenador.
    *                     example: Männlich
    *                   dateBirth:
    *                     type: string
    *                     format: date
    *                     description: Fecha de nacimiento del entrenador.
    *                     example: 1985-07-15
    *                   email:
    *                     type: string
    *                     description: Correo electrónico del entrenador.
    *                     example: hansmueller@example.com
    *                   userName:
    *                     type: string
    *                     description: Nombre de usuario del entrenador.
    *                     example: hans.m
    *                   experience:
    *                     type: integer
    *                     description: Años de experiencia del entrenador.
    *                     example: 7
    *                   educationLevel:
    *                     type: string
    *                     description: Nivel educativo del entrenador.
    *                     example: Bachelor
    *       500:
    *         description: Error interno del servidor.
    */
    router.get("/coaches", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield coachCtrl.getAll();
            res.send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    /**
   * @swagger
   * /coaches/{id}:
   *   get:
   *     summary: Obtener entrenador por ID
   *     description: Este endpoint devuelve un entrenador específico basado en su ID.
   *     tags:
   *       - Coach
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID único del entrenador.
   *         required: true
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: Entrenador encontrado exitosamente.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   description: Identificador único del entrenador.
   *                   example: 1
   *                 name:
   *                   type: string
   *                   description: Nombre completo del entrenador.
   *                   example: Hans Müller Schmidt
   *                 gender:
   *                   type: string
   *                   description: Género del entrenador.
   *                   example: Männlich
   *                 dateBirth:
   *                   type: string
   *                   format: date
   *                   description: Fecha de nacimiento del entrenador.
   *                   example: 1985-07-15
   *                 email:
   *                   type: string
   *                   description: Correo electrónico del entrenador.
   *                   example: hansmueller@example.com
   *                 userName:
   *                   type: string
   *                   description: Nombre de usuario del entrenador.
   *                   example: hans.m
   *                 experience:
   *                   type: integer
   *                   description: Años de experiencia del entrenador.
   *                   example: 7
   *                 educationLevel:
   *                   type: string
   *                   description: Nivel educativo del entrenador.
   *                   example: Bachelor
   *       404:
   *         description: Entrenador no encontrado con el ID proporcionado.
   *       500:
   *         description: Error interno del servidor.
   */
    router.get("/coaches/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const result = yield coachCtrl.getId(parseInt(id));
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    /**
    * @swagger
    * /coaches/{id}:
    *   put:
    *     summary: Actualizar información de un entrenador
    *     description: Este endpoint actualiza la información de un entrenador específico usando su ID.
    *     tags:
    *       - Coach
    *     parameters:
    *       - name: id
    *         in: path
    *         description: ID único del entrenador a actualizar.
    *         required: true
    *         schema:
    *           type: integer
    *           example: 1
    *     requestBody:
    *       description: Información que se actualizará del entrenador.
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
    *                     description: Nombre completo del entrenador.
    *                     example: Hans Müller Schmidt
    *                   gender:
    *                     type: string
    *                     description: Género del entrenador.
    *                     example: Männlich
    *                   dateBirth:
    *                     type: string
    *                     format: date
    *                     description: Fecha de nacimiento del entrenador.
    *                     example: 1985-07-15
    *                   email:
    *                     type: string
    *                     description: Correo electrónico del entrenador.
    *                     example: hansmueller@example.com
    *                   userName:
    *                     type: string
    *                     description: Nombre de usuario del entrenador.
    *                     example: hans.m
    *                   password:
    *                     type: string
    *                     description: Nueva contraseña para el entrenador.
    *                     example: S!ch3rH@ns2024#
    *     responses:
    *       200:
    *         description: Información del entrenador actualizada exitosamente.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: "Entrenador actualizado con éxito"
    *       400:
    *         description: Error en la actualización de la información. Verifique los datos proporcionados.
    *       404:
    *         description: Entrenador no encontrado con el ID proporcionado.
    *       500:
    *         description: Error interno del servidor.
    */
    router.put("/coaches/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const { personalInfo } = req.body;
            const result = yield coachCtrl.update(personalInfo, parseInt(id));
            res.status(400).send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    /**
    * @swagger
    * /coaches/{id}:
    *   delete:
    *     summary: Eliminar un entrenador
    *     description: Este endpoint elimina a un entrenador específico usando su ID.
    *     tags:
    *       - Coach
    *     parameters:
    *       - name: id
    *         in: path
    *         description: ID único del entrenador que se desea eliminar.
    *         required: true
    *         schema:
    *           type: integer
    *           example: 1
    *     responses:
    *       200:
    *         description: Entrenador eliminado exitosamente.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: "Entrenador eliminado con éxito"
    *       404:
    *         description: Entrenador no encontrado con el ID proporcionado.
    *       500:
    *         description: Error interno del servidor.
    */
    router.delete("/coaches/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const result = yield coachCtrl.delete(parseInt(id));
            res.send(result);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }));
    return router;
};
exports.coachRoutes = coachRoutes;