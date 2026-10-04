export interface ApiSuccess<T> {
  success: true;
  data: T;
  requestId: string;
}

/** Errors carry a request ID so students can quote it to support (SRS: user-safe errors). */
export interface ApiError {
  success: false;
  error: { code: string; message: string; details?: unknown };
  requestId: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface PageMeta {
  page: number;
  pageSize: number;
  total: number;
}

export interface Paginated<T> {
  items: T[];
  meta: PageMeta;
}
