import { Router } from "express";
import path from "path";
export const webRoutes = Router();
const homePath = path.join(path.resolve(), "FrontEnd", "index.html");
const dashboardPath = path.join(path.resolve(), "FrontEnd", "dashboard.html");

webRoutes.get("/", (req, res) => {
  res.status(200).sendFile(homePath);
  // res.sendFile("/index.html");
});

// webRoutes.get("/dashboard", (req, res) => {
//   res.status(200).sendFile(dashboardPath);
//   // res.sendFile("/index.html");
// });
