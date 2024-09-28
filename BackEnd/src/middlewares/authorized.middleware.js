import JWT from "jsonwebtoken";
export const authorized = (req, res, next) => {
  try {
    const headers = req.headers;
    const token = headers.authorization.split(" ")[1];
    const isAuthenticated = JWT.verify(token, process.env.SECRET);

    req.body.userId = isAuthenticated.id;

    next();
  } catch (error) {
    next(error);
  }
};
