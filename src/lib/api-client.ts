const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

interface RequestConfig extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>;
}

export const apiClient = {
    get: async <T>(endpoint: string, config?: RequestConfig): Promise<T> => {
        return request<T>(endpoint, { ...config, method: 'GET' });
    },

    post: async <T>(endpoint: string, body: unknown, config?: RequestConfig): Promise<T> => {
        return request<T>(endpoint, { ...config, method: 'POST', body: JSON.stringify(body) });
    },

    put: async <T>(endpoint: string, body: unknown, config?: RequestConfig): Promise<T> => {
        return request<T>(endpoint, { ...config, method: 'PUT', body: JSON.stringify(body) });
    },

    delete: async <T>(endpoint: string, config?: RequestConfig): Promise<T> => {
        return request<T>(endpoint, { ...config, method: 'DELETE' });
    },
};

// Start of request logic
async function request<T>(endpoint: string, config: RequestInit & { params?: Record<string, string | number | boolean | undefined> } = {}): Promise<T> {
    const { params, headers, ...customConfig } = config;

    // Auth endpoints might not be under /api/v1
    const isAuthEndpoint = endpoint.startsWith('/auth');
    const baseUrl = isAuthEndpoint ? BASE_URL : `${BASE_URL}/api/v1`;
    const url = new URL(`${baseUrl}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.append(key, String(value));
            }
        });
    }

    const requestHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers as Record<string, string>,
    };

    const response = await fetch(url.toString(), {
        headers: requestHeaders,
        credentials: 'include',
        ...customConfig,
    });

    if (response.status === 401) {
        // Prevent infinite loop if the refresh endpoint itself returns 401
        if (endpoint === '/auth/token/refresh') {
            throw new Error('Session expired. Please login again.');
        }

        try {
            // Attempt to refresh token
            await apiClient.get('/auth/token/refresh', {});
            // Retry original request
            return request<T>(endpoint, config);
        } catch (error) {
            // Refresh failed, propagate error (caller calls logout)
            throw new Error('Session expired. Please login again.');
        }
    }

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch {
            // ignore if not json
        }

        throw new ApiError(
            (errorData as any)?.errorMessage || `API Error: ${response.status} ${response.statusText}`,
            response.status,
            errorData
        );
    }

    // Handle empty responses (e.g. 204 No Content)
    if (response.status === 204) {
        return {} as T;
    }

    return response.json();
}

export class ApiError extends Error {
    public status: number;
    public data?: any;

    constructor(message: string, status: number, data?: any) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'ApiError';
    }
}
