"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HelloWorldRouteController_1 = __importDefault(require("../controllers/HelloWorldRouteController"));
const WSController_1 = __importDefault(require("../controllers/WSController"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const environment_1 = require("../../config/environment");
const router = express_1.default.Router();
// Base API Routes
router.get('/api', HelloWorldRouteController_1.default.hola);
// WebSocket Routes with auth
router.all('/ws/*', WSController_1.default.index);
// Auth Routes - Simplified error handling and middleware usage
router.get('/auth/roles/:role/permissions', AuthController_1.default.getRolePermissions // Direct controller reference
);
router.get('/auth/check-permission/:role/:menuID', AuthController_1.default.checkPermission // Direct controller reference
);
// View Routes
router.get('/', (req, res) => {
    res.render('index', {
        title: `Hello World from ${environment_1.ENV_CONFIG.APP_NAME}`
    });
});
router.get('/content', (req, res) => {
    res.render('index', { title: 'Hello World' });
});
exports.default = router;
