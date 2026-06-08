export type ApiClientMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiClientRequest<TBody = unknown> = {
  url: string;
  method?: ApiClientMethod;
  body?: TBody;
  headers?: HeadersInit;
  signal?: AbortSignal;
};

export interface ApiResponse<T> {
  isSuccessful: boolean;
  exceptionMessage: string;
  result: T | null;
  statusCode: number;
}