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
const webService_1 = __importDefault(require("../services/webService"));
class WSController {
    /**
     * Main entry point for the web service.
     * This endpoint is a simple example of a route and
     * returns the name of the application.
     * @param req Express Request object
     * @param res Express Response object
     * @param next Express NextFunction object
     * @returns response with status 200 and the name of the application
     */
    static index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = req.method; // HTTP method (GET, POST, etc.)
            const uri = req.params[0]; // URI string after "/ws/"
            // Handle your logic here
            if (method === 'GET') {
                webService_1.default.get(req, res, next);
            }
            else if (method === 'POST') {
                webService_1.default.post(req, res, next);
            }
            else {
                res.status(405).send(`Method ${method} not allowed`);
            }
        });
    }
}
exports.default = WSController;
