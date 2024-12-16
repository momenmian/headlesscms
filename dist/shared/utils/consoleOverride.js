"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../../config/environment");
const logger_1 = __importDefault(require("./logger"));
// Override console.log
console.log = (...args) => {
    if (environment_1.ENV_CONFIG.APP_ENVIRONMENT === 'development') {
        logger_1.default.info(args.map(String).join(' '));
    }
};
