"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./shared/utils/logger"));
const environment_1 = require("./config/environment");
const port = process.env.PORT || 3000;
app_1.default.listen(port, () => {
    logger_1.default.info(`${environment_1.ENV_CONFIG.APP_NAME} is successfully initiated on port: ${port}`);
});
