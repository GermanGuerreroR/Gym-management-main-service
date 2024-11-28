import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Gym management service API 💪 ",
            version: "1.0.0",
            description: "Gym management main service API-REST"
        },
        servers: [
            {
                url: "http://localhost:3001/api/v1"
            },
            {
                url: "gym-management-main-service-production.up.railway.app"
            }
        ]
    },

    apis: [path.join(__dirname, "./src/infrastructure/routes/*.ts")]


};

export default swaggerJSDoc(swaggerOptions);
