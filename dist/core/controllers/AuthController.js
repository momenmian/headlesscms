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
const AuthService_1 = __importDefault(require("../services/AuthService"));
const logger_1 = __importDefault(require("../../shared/utils/logger"));
class AuthController {
    static getRolePermissions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { role } = req.params;
                const permissions = yield AuthService_1.default.getRolePermissions(role);
                res.status(200).json(permissions);
            }
            catch (error) {
                logger_1.default.error('Error getting role permissions:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    static checkPermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { role, menuID } = req.params;
                const hasPermission = yield AuthService_1.default.checkPermission(role, menuID);
                res.status(200).json({ hasPermission });
            }
            catch (error) {
                logger_1.default.error('Error checking permission:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = AuthController;
