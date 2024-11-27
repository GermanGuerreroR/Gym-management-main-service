import express, { Request, Response } from 'express';
import { Report } from '../../application/services/report.services';
const trainingActivitiesRouter = express.Router();

trainingActivitiesRouter.get('/reports/training-activities', async (req: Request, res: Response) => {





    try {
        const report = new Report();
        const result = await report.consultTrainingActivityReport();

        res.status(200).send({
            ok: true,
            msg: result
        })

    } catch (error) {
        console.log(error);
    }





});

export { trainingActivitiesRouter };