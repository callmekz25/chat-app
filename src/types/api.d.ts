export type ApiResponse<T = undefined> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
};
