import express, { Request, Response } from 'express';
import { Report } from '../../application/services/report.services';
const trainingActivitiesRouter = express.Router();

trainingActivitiesRouter.get('/reports/:month/:year/:id', async (req: Request, res: Response) => {
    try {
        const { month, year, id } = req.params;
        const report = new Report();
        const result = await report.consultTrainingActivityReport(Number(month), Number(year), Number(id));

        res.status(200).send({
            ok: true,
            msg: result
        })

    } catch (error) {
        console.log(error);
    }
});

export { trainingActivitiesRouter };