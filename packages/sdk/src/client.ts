import type { ApiError, ApiResponse } from '@freshman-plus/types';
import { API_PREFIX } from './endpoints';

export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: () => string | null | Promise<string | null>;
  onUnauthorized?: () => void | Promise<void>;
  fetchImpl?: typeof fetch;
}

export class ApiClientError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
    public readonly requestId?: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export interface RequestOptions {
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  formData?: FormData;
  signal?: AbortSignal;
}

export function createApiClient(opts: ApiClientOptions) {
  const doFetch = opts.fetchImpl ?? fetch;

  async function request<T>(method: string, path: string, o: RequestOptions = {}): Promise<T> {
    const url = new URL(`${opts.baseUrl.replace(/\/$/, '')}${API_PREFIX}${path}`);
    for (const [k, v] of Object.entries(o.query ?? {})) if (v !== undefined) url.searchParams.set(k, String(v));

    const headers: Record<string, string> = { Accept: 'application/json' };
    const token = await opts.getAccessToken?.();
    if (token) headers.Authorization = `Bearer ${token}`;
    if (o.body !== undefined) headers['Content-Type'] = 'application/json';

    const res = await doFetch(url.toString(), {
      method,
      headers,
      body: o.formData ?? (o.body !== undefined ? JSON.stringify(o.body) : undefined),
      signal: o.signal ?? null,
    });

    if (res.status === 401) await opts.onUnauthorized?.();
    const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

    if (!res.ok || !json || json.success === false) {
      const err = (json as ApiError | null)?.error;
      throw new ApiClientError(
        err?.code ?? 'UNKNOWN',
        err?.message ?? 'Something went wrong. Please try again.',
        res.status,
        (json as ApiError | null)?.requestId,
        err?.details,
      );
    }
    return json.data;
  }

  return {
    get: <T>(path: string, o?: RequestOptions) => request<T>('GET', path, o),
    post: <T>(path: string, o?: RequestOptions) => request<T>('POST', path, o),
    patch: <T>(path: string, o?: RequestOptions) => request<T>('PATCH', path, o),
    put: <T>(path: string, o?: RequestOptions) => request<T>('PUT', path, o),
    delete: <T>(path: string, o?: RequestOptions) => request<T>('DELETE', path, o),
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
