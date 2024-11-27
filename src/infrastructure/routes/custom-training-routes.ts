import express from "express";
import { CustomTrainingGoalController } from "../../application/controllers/custom-training-goal-controller";


export const customTrainingGoalRoutes = () => {
    const router = express.Router();

    const customTrainingGoal = new CustomTrainingGoalController()


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

    router.get("/custom-training-goals/", async (req, res) => {
        try {

            const result = await customTrainingGoal.getAll();
            const status = result.ok === true ? 200 : 404;
            res.status(status).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    router.put("/professional-details/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const info = req.body;
            const result = await customTrainingGoal.update(info, parseInt(id));
            !result.ok ? res.status(400).send(result) : res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error);
        }
    })

    router.delete("/professional-details/:id", async (req, res) => {
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