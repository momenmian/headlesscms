import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import logger from '../../shared/utils/logger';

export default class AuthController {
    public static async getRolePermissions(req: Request, res: Response) {
        try {
            const { role } = req.params;
            const permissions = await AuthService.getRolePermissions(role);
            res.status(200).json(permissions);
        } catch (error) {
            logger.error('Error getting role permissions:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public static async checkPermission(req: Request, res: Response) {
        try {
            const { role, menuID } = req.params;
            const hasPermission = await AuthService.checkPermission(role, menuID);
            res.status(200).json({ hasPermission });
        } catch (error) {
            logger.error('Error checking permission:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}