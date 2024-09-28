import { Router } from "express";
import path from "path";
export const homeRoutes = Router();
const homePath = path.join(path.resolve(), "FrontEnd", "index.html");

homeRoutes.get("/", (req, res) => {
  res.status(200).sendFile(homePath);
  // res.sendFile("/index.html");
  // res.send({messagew: "hello"});
});
