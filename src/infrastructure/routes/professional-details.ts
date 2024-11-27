import express from "express";
import { ProfessionalDetailsController } from "../../application/controllers/professional-details-controller";


export const professionlDetailsRoutes = () => {
    const router = express.Router();

    const professionalDetails = new ProfessionalDetailsController();


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