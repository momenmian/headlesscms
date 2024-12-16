import express, { Express } from 'express';
import requestLogger from './shared/middlewares/requestLogger';
import indexRouter from './core/routes/index';
import path from 'path';
import { createPool } from './config/database';
import logger from './shared/utils/logger';
import './shared/utils/consoleOverride';


class App {
  public app: Express;

  /**
   * Initializes Express instance and configures application with all necessary
   * middlewares, routes, views and database connection.
   * @constructor
   */
  constructor() {
    this.app = express();
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
  private config() {
    this.app.use(requestLogger);
  }

  /**
   * Establishes a connection to the database.
   * Ensures the application has access to the necessary data storage.
   * Handles any connection errors and logs them appropriately.
   * @private
   */
  private async databaseConnections() {
      try {
          await createPool();
          logger.info('Database connection established successfully');
      } catch (error) {
          logger.error('Database connection failed:', error);
          process.exit(1);
      }
  }

  /**
   * Registers all middlewares for Express application.
   * The middlewares are necessary for the application to function correctly.
   * Handles tasks such as authentication, logging, error handling, CORS, etc.
   * @private
   */
  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
  }

  /**
   * Sets up all application routes.
   * Defines the endpoints and their corresponding request handlers.
   * Ensures that each route is properly linked to the associated controller logic.
   * @private
   */
  private routes() {
    this.app.use(indexRouter);
  }

  /**
   * Configures the view engine for the Express application.
   * Sets up the rendering engine and view directory.
   * Enables the application to render dynamic pages based on templates.
   * @private
   */
  private views() {
    this.app.set('views', path.join(__dirname, './views'));
    this.app.set('view engine', 'ejs');
  }
}

export default new App().app;