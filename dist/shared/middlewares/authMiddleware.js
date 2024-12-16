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
exports.authMiddleware = void 0;
const AuthService_1 = __importDefault(require("../../core/services/AuthService"));
const logger_1 = __importDefault(require("../utils/logger"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.id = Date.now().toString();
    try {
        const role = req.headers['x-role'];
        if (!role || typeof role !== 'string') {
            logger_1.default.warn(`Missing or invalid role header. RequestId: ${req.id}`);
            return res.status(401).json({
                status: 'error',
                message: 'Missing or invalid role header',
                requestId: req.id
            });
        }
        try {
            const permissions = yield AuthService_1.default.getRolePermissions(role);
            if (!(permissions === null || permissions === void 0 ? void 0 : permissions.role)) {
                logger_1.default.warn(`Invalid role attempted: ${role}. RequestId: ${req.id}`);
                return res.status(403).json({
                    status: 'error',
                    message: 'Invalid role or no permissions found',
                    requestId: req.id
                });
            }
            req.role = role;
            req.permissions = permissions;
            res.setHeader('X-Role-Verified', 'true');
            res.setHeader('X-Request-ID', req.id);
            res.removeHeader('X-Powered-By');
            next();
        }
        catch (error) {
            logger_1.default.error(`Permission check failed: ${error}. RequestId: ${req.id}`);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to validate permissions',
                requestId: req.id
            });
        }
    }
    catch (error) {
        logger_1.default.error(`Auth middleware error: ${error}. RequestId: ${req.id}`);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            requestId: req.id
        });
    }
});
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
