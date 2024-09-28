export class CustomErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.code = statusCode;
  }
}

export const errorHandlingMiddleware = (error, req, res, next) => {
  console.log({ error });
  res
    .status(error.code || 500)
    .json({ success: false, error: error.message || "something went wrong!" });
};
