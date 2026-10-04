/** Visible on Home without opening settings (SRS FR-010). */
export type SyncState = 'ONLINE' | 'SYNCING' | 'OFFLINE' | 'FAILED';

export interface SyncOperation<T = unknown> {
  /** Client-generated, makes retries idempotent */
  clientOperationId: string;
  entity: 'ATTEMPT' | 'PROGRESS' | 'BOOKMARK' | 'PAYMENT';
  payload: T;
  createdAt: string;
}
