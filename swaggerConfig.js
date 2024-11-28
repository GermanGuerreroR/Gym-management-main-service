"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
            },

        ]
    },
    apis: [path_1.default.join(__dirname, "./src/infrastructure/routes/*.ts")]
    //apis: [path_1.default.join(__dirname, "/src/infrastructure/routes/*.ts")]
    // apis: [path_1.default.join(__dirname, "./dist/infrastructure/routes/*.js")]


};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
