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
exports.Report = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("config"));
class Report {
    consultTrainingActivityReport(month, year, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const urlBase = config_1.default.get('REPORT_SERVICE.URL');
                const url = `${urlBase}/${month}/${year}/${id}`;
                // Realizar la solicitud
                const response = yield axios_1.default.get(url);
                //
                const data = response.data;
                console.log('Generated URL:', url);
                console.log('Response Data:', data);
                return data;
            }
            catch (error) {
                console.error('Error in consultTrainingActivityReport:', error);
                throw error; // Lanza el error para manejarlo en capas superiores
            }
        });
    }
}
exports.Report = Report;
