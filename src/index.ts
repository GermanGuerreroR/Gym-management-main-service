import Express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./swaggerConfig";
import { routes } from "./infrastructure/routes/index-router";
import middleware404 from "./infrastructure/modules/middleware/middleware";

import config from 'config';


const createServer = async () => {
    const app = Express();

    app.use(Express.json());

    app.get("/api", (req, res) => {
        res.send({ msg: "Welcome to Gym management main service" });
    });
    app.use("/api/v1", routes());
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
    app.use(middleware404);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`SERVER Api-Rest RUN: http://localhost:${PORT}`);
    });
};
const urlBase = config.get<string>('REPORT_SERVICE.URL');


createServer();

