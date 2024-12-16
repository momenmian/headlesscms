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
exports.AuthService = void 0;
const database_1 = require("../../config/database");
const logger_1 = __importDefault(require("../../shared/utils/logger"));
class AuthService {
    static getPool() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.pool) {
                this.pool = yield (0, database_1.createPool)();
            }
            return this.pool;
        });
    }
    static getRolePermissions(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.getPool();
                const [roleDetails] = yield pool.execute('SELECT * FROM Roles WHERE role = ?', [role]);
                const [roleMenus] = yield pool.execute('SELECT m.* FROM RoleMenu rm JOIN menuDef m ON rm.menuID = m.menuID WHERE rm.role = ?', [role]);
                const [authorities] = yield pool.execute('SELECT * FROM roleAuthority WHERE role = ?', [role]);
                return {
                    role: roleDetails[0] || null,
                    menus: roleMenus || [],
                    authorities: authorities || []
                };
            }
            catch (error) {
                logger_1.default.error('Error in getRolePermissions:', error);
                throw new Error('Failed to get role permissions');
            }
        });
    }
    static checkPermission(role, menuID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield this.getPool();
                const [result] = yield pool.execute('SELECT ra.* FROM roleAuthority ra WHERE ra.role = ? AND ra.authorityID = ?', [role, menuID]);
                return result[0] || null;
            }
            catch (error) {
                logger_1.default.error('Error in checkPermission:', error);
                throw new Error('Failed to check permissions');
            }
        });
    }
}
exports.AuthService = AuthService;
exports.default = AuthService;
