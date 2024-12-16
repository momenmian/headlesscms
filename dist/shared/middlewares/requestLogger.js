"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../utils/logger"));
const environment_1 = require("../../config/environment");
// Stream to forward logs to Pino
const morganStream = {
    write: (message) => {
        logger_1.default.info(message.trim());
    },
};
// Custom token to differentiate log levels based on status code
morgan_1.default.token('level', (req, res) => {
    const status = res.statusCode;
    return status >= 500
        ? 'error'
        : status >= 400
            ? 'warn'
            : status >= 300
                ? 'info'
                : 'debug';
});
// Request logger function for development environment
const requestLogger = environment_1.ENV_CONFIG.APP_ENVIRONMENT === 'development'
    ? (0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', { stream: morganStream })
    : (req, res, next) => {
        next(); // ignoring logs in production
    };
exports.default = requestLogger;
