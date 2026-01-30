const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

interface RequestConfig extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>;
}

export const apiClient = {
    get: async <T>(endpoint: string, { params, ...customConfig }: RequestConfig = {}): Promise<T> => {
        const url = new URL(`${BASE_URL}${endpoint}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) {
                    url.searchParams.append(key, String(value));
                }
            });
        }

        const config: RequestInit = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            ...customConfig,
        };

        const response = await fetch(url.toString(), config);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    },

    // post, put, delete methods can be added here as needed
};
