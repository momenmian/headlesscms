import express, { Request, Response } from 'express';
import HelloWorldRouteController from '../controllers/HelloWorldRouteController';
import WSController from '../controllers/WSController';
import AuthController from '../controllers/AuthController';
import { ENV_CONFIG } from '../../config/environment';

const router = express.Router();

// Base API Routes
router.get('/api', HelloWorldRouteController.hola);

// WebSocket Routes with auth
router.all('/ws/*', WSController.index);

// Auth Routes - Simplified error handling and middleware usage
router.get(
    '/auth/roles/:role/permissions',
    AuthController.getRolePermissions // Direct controller reference
);

router.get(
    '/auth/check-permission/:role/:menuID',
    AuthController.checkPermission // Direct controller reference
);

// View Routes
router.get('/', (req: Request, res: Response) => {
    res.render('index', { 
        title: `Hello World from ${ENV_CONFIG.APP_NAME}` 
    });
});

router.get('/content', (req: Request, res: Response) => {
    res.render('index', { title: 'Hello World' });
});

export default router;
