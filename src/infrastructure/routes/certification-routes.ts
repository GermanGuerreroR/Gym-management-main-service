import express from "express";
import { CertificationController } from "../../application/controllers/certification-controller";


export const certificationRoutes = () => {
    const router = express.Router();

    const certificationCTRL = new CertificationController();


    router.post("/certifications/:id", (req, res) => {
        const idCoach = req.params.id;
        const { certificationInfo } = req.body;
        certificationCTRL
            .add(certificationInfo, parseInt(idCoach))
            .then((result) => {
                if (result.ok) res.status(200).send(result);
                if (!result.ok) res.status(400).send(result);
                return;
            })
            .catch((error) => {
                res.status(500).send(error);
            });
    });

    router.get("/certifications", async (_, res) => {
        try {
            const result = await certificationCTRL.getAll();
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    router.get("/certifications/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const result = await certificationCTRL.getId(parseInt(id));
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    router.put("/certifications/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const { certificationInfo } = req.body;
            const result = await certificationCTRL.update(certificationInfo, parseInt(id));
            !result.ok ? res.status(400).send(result) : res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    router.delete("/certifications/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const result = await certificationCTRL
            res.send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    return router;
}