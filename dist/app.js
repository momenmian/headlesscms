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
const requestLogger_1 = __importDefault(require("./shared/middlewares/requestLogger"));
const index_1 = __importDefault(require("./core/routes/index"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
const logger_1 = __importDefault(require("./shared/utils/logger"));
require("./shared/utils/consoleOverride");
class App {
    /**
     * Initializes Express instance and configures application with all necessary
     * middlewares, routes, views and database connection.
     * @constructor
     */
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.databaseConnections();
        this.middlewares();
        this.routes();
        this.views();
    }
    /**
     * Configure Express application.
     * @private
     * @function
     */
    config() {
        this.app.use(requestLogger_1.default);
    }
    /**
     * Establishes a connection to the database.
     * Ensures the application has access to the necessary data storage.
     * Handles any connection errors and logs them appropriately.
     * @private
     */
    databaseConnections() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, database_1.createPool)();
                logger_1.default.info('Database connection established successfully');
            }
            catch (error) {
                logger_1.default.error('Database connection failed:', error);
                process.exit(1);
            }
        });
    }
    /**
     * Registers all middlewares for Express application.
     * The middlewares are necessary for the application to function correctly.
     * Handles tasks such as authentication, logging, error handling, CORS, etc.
     * @private
     */
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    /**
     * Sets up all application routes.
     * Defines the endpoints and their corresponding request handlers.
     * Ensures that each route is properly linked to the associated controller logic.
     * @private
     */
    routes() {
        this.app.use(index_1.default);
    }
    /**
     * Configures the view engine for the Express application.
     * Sets up the rendering engine and view directory.
     * Enables the application to render dynamic pages based on templates.
     * @private
     */
    views() {
        this.app.set('views', path_1.default.join(__dirname, './views'));
        this.app.set('view engine', 'ejs');
    }
}
exports.default = new App().app;
