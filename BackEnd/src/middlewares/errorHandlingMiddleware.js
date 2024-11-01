export class CustomErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.code = statusCode;
  }
}

export const errorHandlingMiddleware = (error, req, res, next) => {
  if (error.code === 11000) {
    return res
      .status(400)
      .json({ success: false, error: "User already registered! Please login" });
  }

  res
    .status(error.code || 500)
    .json({ success: false, error: error.message || "something went wrong!" });
};
