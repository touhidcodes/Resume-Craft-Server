import { ZodError } from "zod";
import { TErrorResponse, TErrorSources } from "../interface/error";
import httpStatus from "http-status";

const handleZodError = (err: ZodError): TErrorResponse => {
  const errorSources: TErrorSources[] = err.issues.map((issue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  let message: string = "";
  errorSources.forEach((error: TErrorSources) => {
    message += error.message + ",";
  });
  const statusCode = httpStatus.NOT_ACCEPTABLE;
  return {
    statusCode,
    message,
    errorSources,
  };
};
export default handleZodError;
