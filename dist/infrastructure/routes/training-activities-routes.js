"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainingActivitiesRouter = void 0;
const express_1 = __importDefault(require("express"));
const report_services_1 = require("../../application/services/report.services");
const trainingActivitiesRouter = express_1.default.Router();
exports.trainingActivitiesRouter = trainingActivitiesRouter;
trainingActivitiesRouter.get('/reports/:month/:year/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, year, id } = req.params;
        const report = new report_services_1.Report();
        const result = yield report.consultTrainingActivityReport(Number(month), Number(year), Number(id));
        res.status(200).send({
            ok: true,
            msg: result
        });
    }
    catch (error) {
        console.log(error);
    }
}));
