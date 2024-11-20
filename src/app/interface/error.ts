export type TErrorSources = {
  field?: string | number;
  path?: string | number;
  message: string;
};

export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources[];
};
