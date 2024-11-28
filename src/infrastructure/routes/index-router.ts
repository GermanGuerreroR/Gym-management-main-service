import Express from "express";
import { coachRoutes } from "./coach-routes"
import { certificationRoutes } from "./certification-routes";
import { professionlDetailsRoutes } from "./professional-details";
import { apprenticeRoutes } from "./apprentice-routes";
import { specialitiesRoutes } from "./speciality-routes";
import { customTrainingGoalRoutes } from "./custom-training-routes";
import { trainingActivitiesRouter } from "./training-activities-routes";
import { trainingRegisterActivity } from "./training-register-router";
export const routes = () => {
    const router = Express.Router();

    router.use(coachRoutes());
    router.use(certificationRoutes());
    router.use(specialitiesRoutes());
    router.use(professionlDetailsRoutes());
    router.use(apprenticeRoutes());
    router.use(customTrainingGoalRoutes());
    router.use(trainingRegisterActivity());
    router.use(trainingActivitiesRouter);

    return router;
}