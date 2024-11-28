"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolConnection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = __importDefault(require("config"));
const configOptions = {
    host: config_1.default.get("HOST"),
    user: config_1.default.get("USER"),
    password: config_1.default.get("PASSWORD"),
    database: config_1.default.get("DATABASE"),
    port: config_1.default.get("DB_PORT"),
};
const getPoolConnection = () => {
    const connection = promise_1.default.createPool(configOptions);
    return connection;
};
exports.getPoolConnection = getPoolConnection;
