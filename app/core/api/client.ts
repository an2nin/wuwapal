type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  payload?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
  headers?: Record<string, string>;
}

function buildQueryString(params?: RequestOptions['params']): string {
  if (!params)
    return '';

  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');

  return queryString ? `?${queryString}` : '';
}

export class ApiError extends Error {
  status: number;
  statusText: string;
  body: any;
  constructor(status: number, statusText: string, body: any) {
    super(
      typeof body?.error?.message === 'string'
        ? body.error.message
        : `API request failed with status ${status} (${statusText})`,
    );
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

async function request<T>(
  url: string,
  method: HttpMethod,
  { payload, params, headers }: RequestOptions = {},
): Promise<T> {
  const finalUrl = `${url}${buildQueryString(params)}`;

  const requestHeaders: Record<string, string> = {
    ...(method === 'GET' ? {} : { 'Content-Type': 'application/json' }),
    ...(headers || {}),
  };

  const options: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (payload && method !== 'GET') {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(finalUrl, options);

  let data: any;
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    data = await response.json();
  }
  else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText, data);
  }

  return data as T;
}

export const api = {
  get: <T>(url: string, options?: Omit<RequestOptions, 'payload'>) =>
    request<T>(url, 'GET', options),
  post: <T>(url: string, payload?: unknown, options?: Omit<RequestOptions, 'payload'>) =>
    request<T>(url, 'POST', { ...options, payload }),
  put: <T>(url: string, payload?: unknown, options?: Omit<RequestOptions, 'payload'>) =>
    request<T>(url, 'PUT', { ...options, payload }),
  patch: <T>(url: string, payload?: unknown, options?: Omit<RequestOptions, 'payload'>) =>
    request<T>(url, 'PATCH', { ...options, payload }),
  delete: <T>(url: string, options?: Omit<RequestOptions, 'payload'>) =>
    request<T>(url, 'DELETE', options),
};
