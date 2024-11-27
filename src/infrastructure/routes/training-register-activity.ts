import express from "express";
import { TrainingActivityController } from "../../application/controllers/training-activity-controller";



export const trainingRegisterActivity = () => {
    const router = express.Router();

    const trainingCtrl = new TrainingActivityController();


    router.post("/trainings", (req, res) => {
        
    })
};
