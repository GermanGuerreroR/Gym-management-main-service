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
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = __importDefault(require("./swaggerConfig"));
const index_router_1 = require("./infrastructure/routes/index-router");
const middleware_1 = __importDefault(require("./infrastructure/modules/middleware/middleware"));
const config_1 = __importDefault(require("config"));
const createServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/api", (req, res) => {
        res.send({ msg: "Welcome to Gym management main service" });
    });
    app.use("/api/v1", (0, index_router_1.routes)());
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
    app.use(middleware_1.default);
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`SERVER Api-Rest RUN: http://localhost:${PORT}`);
    });
});
const urlBase = config_1.default.get('REPORT_SERVICE.URL');
createServer();
