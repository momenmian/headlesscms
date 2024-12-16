"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_CONFIG = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV_CONFIG = {
    APP_NAME: process.env.APP_NAME,
    APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || 'development',
    PORT: process.env.PORT,
};
