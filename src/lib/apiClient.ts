import type { ApiResponse } from "@/shared/types/api.types";

const apiClient = async <T>(
  url: string,
  options?: Omit<RequestInit, "body"> & { body?: unknown },
): Promise<ApiResponse<T>> => {
  const config: RequestInit = {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  } as RequestInit;

  if (options?.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json() as Promise<ApiResponse<T>>;
};

export default apiClient;
