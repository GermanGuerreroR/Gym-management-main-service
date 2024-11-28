"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const coach_routes_1 = require("./coach-routes");
const certification_routes_1 = require("./certification-routes");
const professional_details_1 = require("./professional-details");
const apprentice_routes_1 = require("./apprentice-routes");
const speciality_routes_1 = require("./speciality-routes");
const custom_training_routes_1 = require("./custom-training-routes");
const training_activities_routes_1 = require("./training-activities-routes");
const training_register_router_1 = require("./training-register-router");
const routes = () => {
    const router = express_1.default.Router();
    router.use((0, coach_routes_1.coachRoutes)());
    router.use((0, certification_routes_1.certificationRoutes)());
    router.use((0, speciality_routes_1.specialitiesRoutes)());
    router.use((0, professional_details_1.professionlDetailsRoutes)());
    router.use((0, apprentice_routes_1.apprenticeRoutes)());
    router.use((0, custom_training_routes_1.customTrainingGoalRoutes)());
    router.use((0, training_register_router_1.trainingRegisterActivity)());
    router.use(training_activities_routes_1.trainingActivitiesRouter);
    return router;
};
exports.routes = routes;
