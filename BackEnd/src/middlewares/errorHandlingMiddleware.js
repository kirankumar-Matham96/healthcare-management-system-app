export class CustomErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.code = statusCode;
  }
}

export const errorHandlingMiddleware = (error, req, res, next) => {
  res.status(error.code || 500).send(error.message || "something went wrong!");
};
