export const USER_STATUS = { ACTIVE: 'ACTIVE', SUSPENDED: 'SUSPENDED' } as const;
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export const ENTITY_STATUS = { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE' } as const;
export type EntityStatus = (typeof ENTITY_STATUS)[keyof typeof ENTITY_STATUS];

export const PUBLISH_STATUS = { DRAFT: 'DRAFT', PUBLISHED: 'PUBLISHED', ARCHIVED: 'ARCHIVED' } as const;
export type PublishStatus = (typeof PUBLISH_STATUS)[keyof typeof PUBLISH_STATUS];

/**
 * Manual screenshot-payment lifecycle (matches the mobile flow):
 * Payment Details -> Upload Screenshot -> Submitted -> Awaiting Admin Approval -> Access Granted
 */
export const PAYMENT_STATUS = {
  AWAITING_SCREENSHOT: 'AWAITING_SCREENSHOT',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
} as const;
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const ENTITLEMENT_STATUS = { ACTIVE: 'ACTIVE', EXPIRED: 'EXPIRED', REVOKED: 'REVOKED' } as const;
export type EntitlementStatus = (typeof ENTITLEMENT_STATUS)[keyof typeof ENTITLEMENT_STATUS];

/** Admin approval SLA shown to students ("within 24 hours") */
export const APPROVAL_SLA_HOURS = 24;
