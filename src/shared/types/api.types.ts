export interface ApiResponse<T> {
  isSuccessful: boolean;
  exceptionMessage: string;
  result: T;
  statusCode: number;
}
