import { Request, Response, NextFunction } from 'express';
import AuthService from '../../core/services/AuthService';
import logger from '../utils/logger';

// Define interfaces for permissions
export interface IRoleDetails {
    role: string;
    displayName?: string;
}

export interface IMenuItem {
    menuID: string;
    menuURL?: string;
}

export interface IAuthority {
    id: number;
    authorityID: string;
    canView?: number;
    canChange?: number;
    canDelete?: number;
}

export interface IPermissions {
    role: IRoleDetails | null;
    menus: IMenuItem[];
    authorities: IAuthority[];
}

export interface IAuthRequest extends Request {
    role?: string;
    permissions?: IPermissions;
    id?: string;
}

export const authMiddleware = async (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
) => {
    req.id = Date.now().toString();

    try {
        const role = req.headers['x-role'];

        if (!role || typeof role !== 'string') {
            logger.warn(`Missing or invalid role header. RequestId: ${req.id}`);
            return res.status(401).json({
                status: 'error',
                message: 'Missing or invalid role header',
                requestId: req.id
            });
        }

        try {
            const permissions = await AuthService.getRolePermissions(role);

            if (!permissions?.role) {
                logger.warn(`Invalid role attempted: ${role}. RequestId: ${req.id}`);
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
        } catch (error) {
            logger.error(`Permission check failed: ${error}. RequestId: ${req.id}`);
            return res.status(500).json({
                status: 'error',
                message: 'Failed to validate permissions',
                requestId: req.id
            });
        }
    } catch (error) {
        logger.error(`Auth middleware error: ${error}. RequestId: ${req.id}`);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            requestId: req.id
        });
    }
};

export default authMiddleware;