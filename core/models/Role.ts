// core/models/Role.ts
export interface Role {
    role: string;
    home?: string;
    priority?: number;
    maxSessions?: number;
    inactivityTimeout?: number;
    passwordFailLimit?: number;
    nFAFailLimit?: number;
    orgId?: string;
    isPartnerRole?: number;
    owner?: string;
    description?: string;
    expirationDuration?: number;
    accntLockDuration?: number;
    resetAccntCounter?: number;
    chCapacity?: number;
    displayName?: string;
}

// core/models/RoleMenu.ts
export interface RoleMenu {
    role: string;
    menuID: string;
}

// core/models/MenuDef.ts
export interface MenuDef {
    menuID: string;
    parent?: string;
    menuURL?: string;
    cssParent?: string;
    cssClass?: string;
    aClass?: string;
    dataToggle?: string;
    context?: string;
    slNum?: number;
    colDef?: string;
    wsName?: string;
    vwName?: string;
    functionName?: string;
    functionType?: string;
    owner?: string;
    rejectReason?: string;
    caption?: string;
    guide?: string;
}

// core/models/RoleAuthority.ts
export interface RoleAuthority {
    id: number;
    role?: string;
    authorityID?: string;
    canView?: number;
    canChange?: number;
    canDelete?: number;
}