import type { EntitlementStatus } from '@freshman-plus/constants';
import type { ID, ISODateString } from './common';
import type { PurchaseItemType } from './payment';

export interface Entitlement {
  id: ID;
  userId: ID;
  itemType: PurchaseItemType;
  itemId: ID;
  paymentId: ID;
  status: EntitlementStatus;
  grantedAt: ISODateString;
  expiresAt: ISODateString | null;
}
