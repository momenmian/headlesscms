import mysql from 'mysql2/promise';
import { createPool, dbConfig } from '../../config/database';
import logger from '../../shared/utils/logger';

interface RoleDetails {
    role: string;
    home?: string;
    priority?: number;
    maxSessions?: number;
    displayName?: string;
}

interface RoleMenu {
    menuID: string;
    menuURL?: string;
    caption?: string;
}

interface RoleAuthority {
    id: number;
    role: string;
    authorityID: string;
    canView?: number;
    canChange?: number;
    canDelete?: number;
}

export class AuthService {
    private static pool: mysql.Pool;

    private static async getPool() {
        if (!this.pool) {
            this.pool = await createPool();
        }
        return this.pool;
    }

    static async getRolePermissions(role: string) {
        try {
            const pool = await this.getPool();

            const [roleDetails] = await pool.execute<mysql.RowDataPacket[]>(
                'SELECT * FROM Roles WHERE role = ?',
                [role]
            );

            const [roleMenus] = await pool.execute<mysql.RowDataPacket[]>(
                'SELECT m.* FROM RoleMenu rm JOIN menuDef m ON rm.menuID = m.menuID WHERE rm.role = ?',
                [role]
            );

            const [authorities] = await pool.execute<mysql.RowDataPacket[]>(
                'SELECT * FROM roleAuthority WHERE role = ?',
                [role]
            );

            return {
                role: roleDetails[0] as RoleDetails || null,
                menus: roleMenus as RoleMenu[] || [],
                authorities: authorities as RoleAuthority[] || []
            };
        } catch (error) {
            logger.error('Error in getRolePermissions:', error);
            throw new Error('Failed to get role permissions');
        }
    }

    static async checkPermission(role: string, menuID: string) {
        try {
            const pool = await this.getPool();
            const [result] = await pool.execute<mysql.RowDataPacket[]>(
                'SELECT ra.* FROM roleAuthority ra WHERE ra.role = ? AND ra.authorityID = ?',
                [role, menuID]
            );
            return result[0] as RoleAuthority || null;
        } catch (error) {
            logger.error('Error in checkPermission:', error);
            throw new Error('Failed to check permissions');
        }
    }
}

export default AuthService;