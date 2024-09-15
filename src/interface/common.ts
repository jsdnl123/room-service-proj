export interface ApiResponse<T> {
  status: number;
  code: string;
  data: T;
}

export interface CommonResponse<T> {
  data: T;
}
