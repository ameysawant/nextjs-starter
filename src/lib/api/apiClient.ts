import { configuration as config } from "@/config/configuration";
import type { ApiResponse, ApiClientRequest } from "@/shared/types/api.types";

export const apiClient = async <T = unknown>(params: ApiClientRequest): Promise<ApiResponse<T>> => {
  const { url, method = "GET", body, headers: extraHeaders, signal } = params;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(extraHeaders ?? {}),
  };

  let bodyInit: BodyInit | undefined;
  if (body !== undefined) {
    bodyInit = typeof body === "string" ? body : JSON.stringify(body);
  }

  const requestInit: RequestInit = {
    method,
    headers,
    body: bodyInit,
    signal,
  };

  try {
    const response = await fetch(`${config.api.baseUrl}${url}`, requestInit);

    try {
      const payload = (await response.json()) as ApiResponse<T>;
      return {
        ...payload,
        statusCode: payload.statusCode ?? response.status,
      };
    } catch {
      return {
        isSuccessful: false,
        exceptionMessage: response.ok ? "Invalid JSON in response." : `Request failed (${response.status}).`,
        result: null,
        statusCode: response.status,
      };
    }
  } catch {
    return {
      isSuccessful: false,
      exceptionMessage:
        "Unable to connect to the server. Please check your network connection or try again later.",
      result: null,
      statusCode: 0,
    };
  }
};