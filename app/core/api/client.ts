type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<T>(
  url: string,
  method: HttpMethod,
  payload?: unknown,
  customHeaders?: Record<string, string>,
): Promise<T> {
  const defaultHeaders: Record<string, string>
    = method === 'GET' ? {} : { 'Content-Type': 'application/json' };

  const options: RequestInit = {
    method,
    headers: {
      ...defaultHeaders,
      ...customHeaders, // merge in dynamic headers
    },
  };

  if (payload && method !== 'GET') {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: <T>(url: string, headers?: Record<string, string>) =>
    request<T>(url, 'GET', undefined, headers),
  post: <T>(url: string, payload: unknown, headers?: Record<string, string>) =>
    request<T>(url, 'POST', payload, headers),
  put: <T>(url: string, payload: unknown, headers?: Record<string, string>) =>
    request<T>(url, 'PUT', payload, headers),
  patch: <T>(url: string, payload: unknown, headers?: Record<string, string>) =>
    request<T>(url, 'PATCH', payload, headers),
  delete: <T>(url: string, headers?: Record<string, string>) =>
    request<T>(url, 'DELETE', undefined, headers),
};
