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
const logger_1 = __importDefault(require("../../shared/utils/logger"));
const environment_1 = require("../../config/environment");
class HelloWorldRouteController {
    /**
     * Hello World endpoint.
     * This endpoint is a simple example of a route and
     * returns the name of the application.
     * @param req Express Request object
     * @param res Express Response object
     * @returns response with status 200 and the name of the application
     */
    static hola(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("HelloWorldRouteController is successfully initiated");
            // you can validate the request here
            // call the service for business logic
            // send json response
            res.status(200).json({
                message: `Hello World from ${environment_1.ENV_CONFIG.APP_NAME}`,
                environment: environment_1.ENV_CONFIG.APP_ENVIRONMENT
            });
        });
    }
}
exports.default = HelloWorldRouteController;
